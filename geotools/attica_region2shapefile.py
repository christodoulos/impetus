import geopandas as gpd

# Load the GeoJSON file from geodata.gov.gr https://bit.ly/3VpVe06
geojson_file = "geojson/allgreeceregions.geojson"
gdf = gpd.read_file(geojson_file)

# The specific id of Attica region
subfeature_id = "d7f50467-e5ef-49ac-a7ce-15df3e2ed738.12"

# Filter the GeoDataFrame to keep only the subfeature of Attica region
subfeature_gdf = gdf[gdf["id"] == subfeature_id]

# Save the subfeature as a shapefile
output_shapefile = "geojson/attica/attica.shp"
subfeature_gdf.to_file(output_shapefile, driver="ESRI Shapefile")
