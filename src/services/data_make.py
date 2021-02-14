from numpy.lib.utils import who
import requests as request
import pandas as pd


def extract_who_data(data):
    result = {}
    result["countrycode"] = data["value"]
    result["reported_cases"] = data["data"]["totals"][5]
    return result


def main():
    r = request.get(
        "https://www.epicov.org/epi3/3p/subm_stats1/export/country_submission_ranking.json"
    )
    if r.status_code == 200:
        gisaid_data = pd.DataFrame.from_records(r.json()["stats"])
        print(gisaid_data)
    else:
        raise Exception("Could not retrieve data from GISAID")

    r = request.get("https://covid19.who.int/page-data/table/page-data.json")
    if r.status_code == 200:
        result = r.json()["result"]["pageContext"]["countryGroups"]
        result = map(extract_who_data, result)
        who_data = pd.DataFrame.from_records(result)
        who_data = who_data[who_data["reported_cases"] != 0]
    else:
        raise Exception("Could not retrieve data from GISAID")

    combine_data = pd.merge(gisaid_data, who_data, on=["countrycode"], how="inner")
    combine_data.dropna(inplace=True)
    combine_data["perc_sequenced"] = (
        combine_data["count"] / combine_data["reported_cases"]
    ) * 100

    combine_data.columns = [
        "country",
        "country_code",
        "count",
        "dtd",
        "reported_cases",
        "perc_sequenced",
    ]
    combine_data = combine_data.astype(
        {
            "count": "int32",
            "dtd": "int32",
            "reported_cases": "int32",
        }
    )
    combine_data = combine_data.sort_values(by="perc_sequenced", ascending=False)

    combine_data.to_json("test.json", orient="records")


if __name__ == "__main__":
    main()