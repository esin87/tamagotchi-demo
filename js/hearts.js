// https://party.js.org/docs/guides/custom-effects
const heartPath = document.createElementNS(
	'http://www.w3.org/2000/svg',
	'path'
);
heartPath.setAttribute(
	'd',
	'M316.722,29.761c66.852,0,121.053,54.202,121.053,121.041c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801 C0,67.584,54.202,29.761,121.041,29.761c40.262,0,75.827,19.745,97.841,49.976C240.899,49.506,276.47,29.761,316.722,29.761z'
);

const heartShape = document.createElementNS(
	'http://www.w3.org/2000/svg',
	'svg'
);
heartShape.setAttribute('viewBox', '0 0 512 512');
heartShape.setAttribute('height', '20');
heartShape.setAttribute('width', '20');
heartShape.appendChild(heartPath);
