#!/usr/bin/env python3

import pandas as pd
import os
import sys

def createJSON(team):
    datapath = f"./data/{team}Data"
    dataJSON = f"./{datapath}/dataJSON"
    os.mkdir(dataJSON)
    for file in os.listdir(datapath):
        filename = os.fsdecode(file)
        if (filename.endswith(".csv")):
            df = pd.read_csv(f"{datapath}/{filename}")
            df.to_json(f"{dataJSON}/{filename[:filename.find(".")]}.json", orient='records', indent=4)

# Call this file like ./parse.py {Bruins,RedSox,Patriots,Celtics}
def main():
    args = sys.argv[1:]
    if len(sys.argv) == 2:
        createJSON(args[0])
    else:
        print("Must be called like 'parse.py TEAM_NAME'")

main()
