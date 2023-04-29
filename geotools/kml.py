import xml.etree.ElementTree as ET
from typing import Tuple, List
import os


def parse_kml_coordinates(kml_file: str) -> List[Tuple[float, float]]:
    tree = ET.parse(kml_file)
    root = tree.getroot()

    namespace = {"kml": "http://www.opengis.net/kml/2.2"}
    coordinates_element = root.find(
        ".//kml:Polygon/kml:outerBoundaryIs/kml:LinearRing/kml:coordinates", namespace
    )
    coordinates_text = coordinates_element.text.strip()

    coordinates = []
    for coordinate in coordinates_text.split():
        lon, lat = map(float, coordinate.split(","))
        coordinates.append((lon, lat))

    return coordinates


def calculate_centroid(coordinates: List[Tuple[float, float]]) -> Tuple[float, float]:
    x, y = zip(*coordinates)
    centroid_x = sum(x) / len(coordinates)
    centroid_y = sum(y) / len(coordinates)
    return centroid_x, centroid_y


def calculate_bounding_box(
    coordinates: List[Tuple[float, float]]
) -> Tuple[float, float, float, float]:
    min_lon = min(coord[0] for coord in coordinates)
    max_lon = max(coord[0] for coord in coordinates)
    min_lat = min(coord[1] for coord in coordinates)
    max_lat = max(coord[1] for coord in coordinates)
    return min_lon, min_lat, max_lon, max_lat


def kml_calculations(kml_file: str):
    print(f"=== {kml_file} ===")

    coordinates = parse_kml_coordinates(kml_file)

    centroid = calculate_centroid(coordinates)
    print(f"Centroid: {centroid}")

    bounding_box = calculate_bounding_box(coordinates)
    print(f"Bounding Box: {bounding_box}")


if __name__ == "__main__":
    for filename in os.listdir("kml"):
        file_path = os.path.join("kml", filename)
        kml_calculations(file_path)
