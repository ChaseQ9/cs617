#!/usr/bin/env python3

import pandas as pd
import os

datapath = "./data/BruinsData"
dataJSON = f"./{datapath}/dataJSON"
def main():
    os.mkdir(dataJSON)
    for file in os.listdir(datapath):
        filename = os.fsdecode(file)
        if (filename.endswith(".csv")):
            df = pd.read_csv(f"{datapath}/{filename}")
            df.to_json(f"{dataJSON}/{filename[:filename.find(".")]}.json", orient='records', indent=4)

main()

