#!/bin/bash
node farmair/farmairScan farmair/data/chardonay\ oinodiadromes/ 2>/dev/null
node farmair/kml2geojson farmair/data/chardonay\ oinodiadromes/chardonay\ oinodiadromes.kml
node farmair/farmairVineyard farmair/data/chardonay\ oinodiadromes/

node farmair/farmairScan farmair/data/C.S.\ WINERY/ 2>/dev/null
node farmair/kml2geojson farmair/data/C.S.\ WINERY/C.S.\ WINERY.kml
node farmair/farmairVineyard farmair/data/C.S.\ WINERY/