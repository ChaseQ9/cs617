#!/usr/bin/env python3

import pandas as pd
import json

# Global variable containing LU's which we are looking for
resedential_lus = ["R1", "R2", "R3", "R4", "RC", "RL", "A"]

def dropBadFields(df):
    df = df[df["LU"].isin(resedential_lus)]
    df = df[df['LIVING_AREA'] != 0]
    df = df[df['CITY'] != 0]
    df = df[df['ZIP_CODE'] != 0]
    return df
    
def main():
    # This function used chatgpt in order to read and parse the file containing
    # the data regarding the property information of Boston
    file = "data/Property_Data/property"
    df = pd.read_csv(f"./{file}.csv", dtype={'ZIP_CODE': str})
    numeric_cols = [
    "ST_NUM", "LAND_SF", "GROSS_AREA", "LIVING_AREA",
    "LAND_VALUE", "BLDG_VALUE", "TOTAL_VALUE",
    "GROSS_TAX", "YR_BUILT", "BED_RMS", "FULL_BTH",
    "HLF_BTH", "KITCHENS", "TT_RMS", "FIREPLACES", "NUM_PARKING"
    ]

    for col in numeric_cols:
        df[col] = (
            df[col]
            .astype(str)
            .str.replace(",", "", regex=False)
            .str.replace("$", "", regex=False)
            .str.strip()
        )
        df[col] = pd.to_numeric(df[col], errors="coerce")

    df = df.fillna(0)
    df = dropBadFields(df)
    data = df.to_dict(orient="records")

    with open("./prop.json", "w") as f:
        json.dump(data, f)

main()
