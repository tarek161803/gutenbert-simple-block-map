import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { lat, lng, zoom, height } = attributes;

	return (
		<>
			<div {...useBlockProps.save()}>
				<div id="map" style={{ height: `${height}px` }} />
			</div>

			<link
				rel="stylesheet"
				href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
			/>

			<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
			<script>
				{`
						const map = L.map('map').setView([${lat}, ${lng}], ${zoom});
						L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
						L.marker([${lat}, ${lng}]).addTo(map)
				`}
			</script>
		</>
	);
}
