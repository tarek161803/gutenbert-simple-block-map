import { useBlockProps } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./editor.scss";

// Import the marker icon and shadow images
import defaultMarkerIcon from "leaflet/dist/images/marker-icon.png";
import defaultMarkerShadow from "leaflet/dist/images/marker-shadow.png";

export default function Edit({ attributes, setAttributes }) {
	const { lat, lng, zoom, height } = attributes;

	useEffect(() => {
		const map = L.map("map").setView([lat, lng], zoom);
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
			map,
		);

		const customIconOptions = {
			iconUrl: defaultMarkerIcon,
			shadowUrl: defaultMarkerShadow,
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41],
			shadowAnchor: [12, 41],
		};

		const customIcon = L.icon(customIconOptions);
		L.marker([lat, lng], { icon: customIcon }).addTo(map);

		map.on("zoom", () => {
			setAttributes({
				zoom: map.getZoom(),
			});
		});

		map.on("click", (e) => {
			setAttributes({
				lat: e.latlng.lat,
				lng: e.latlng.lng,
			});
		});

		return () => {
			map.remove();
		};
	}, [lat, lng, zoom]);

	return (
		<div {...useBlockProps()}>
			<div className="input-container">
				<TextControl
					label="Enter Latitude"
					type="number"
					value={lat}
					onChange={(newValue) => {
						setAttributes({ lat: +newValue });
					}}
				/>
				<TextControl
					label="Enter Longitude"
					type="number"
					value={lng}
					onChange={(newValue) => setAttributes({ lng: +newValue })}
				/>
				<TextControl
					label="Enter Zoom"
					type="number"
					value={zoom}
					onChange={(newValue) => setAttributes({ zoom: +newValue })}
				/>
				<TextControl
					label="Enter Height"
					type="number"
					value={height}
					onChange={(newValue) => setAttributes({ height: +newValue })}
				/>
			</div>
			<div id="map" style={{ height: `${height}px`, window: "100%" }} />
		</div>
	);
}
