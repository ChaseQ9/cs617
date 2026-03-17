import json

json_data = []


with open("locs.txt", "r") as file:
    content = [line.strip() for line in file]


for item in content:
    data = item.split(',')
    json_item = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                data[1], 
                data[0] 
                ]
            },
            "properties": {
                "name": ""
             }
        }
    json_data.append(json_item)


final_json = json.dumps(json_data, indent=4)
print(final_json)

with open("locs.json", 'w') as json_file:
    json.dump(json_data, json_file, indent=4)
