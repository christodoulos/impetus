import geopandas as gpd
import xmltodict
from shapely.geometry import shape, Point, LineString, Polygon
import os


def kml_to_geojson(kml_file, geojson_file):
    # Parse KML file
    with open(kml_file, "r") as file:
        content = file.read()
    kml_data = xmltodict.parse(content)

    # Extract Placemarks and their geometries
    document = kml_data["kml"]["Document"]
    if "Folder" in document:
        placemarks = document["Folder"]["Placemark"]
    else:
        placemarks = document["Placemark"]

    # Ensure placemarks is a list
    if not isinstance(placemarks, list):
        placemarks = [placemarks]

    features = []
    for placemark in placemarks:
        geom = None
        data = placemark

        # Handle Point, LineString, and Polygon geometries
        for key in data.keys():
            if key == "Point":
                coords = list(map(float, data[key]["coordinates"].split(",")))
                geom = Point(*coords)
            elif key == "LineString":
                coords = [
                    list(map(float, coord.split(",")))
                    for coord in data[key]["coordinates"].split()
                ]
                geom = LineString(coords)
            elif key == "Polygon":
                coords = [
                    list(map(float, coord.split(",")))
                    for coord in data[key]["outerBoundaryIs"]["LinearRing"][
                        "coordinates"
                    ].split()
                ]
                geom = Polygon(coords)

        # Extract properties
        properties = {
            key: value
            for key, value in data.items()
            if not key.startswith(("Point", "LineString", "Polygon"))
        }

        # Create a feature
        feature = {
            "type": "Feature",
            "geometry": geom.__geo_interface__,
            "properties": properties,
        }
        features.append(feature)

    # Create a GeoDataFrame from the extracted features
    gdf = gpd.GeoDataFrame.from_features(features)

    # Save GeoDataFrame as a GeoJSON file
    gdf.to_file(geojson_file, driver="GeoJSON")


if __name__ == "__main__":
    for filename in os.listdir("kml"):
        file_path = os.path.join("kml", filename)
        filename, _ = os.path.splitext(os.path.basename(file_path))
        geojson = f"{filename}.geojson"
        geojson_filename = os.path.join("kml", geojson)
        kml_to_geojson(file_path, geojson_filename)
