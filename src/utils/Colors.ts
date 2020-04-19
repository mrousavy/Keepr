import Colors from '../styles/Colors';

export type RGB = {
	r: number,
	g: number,
	b: number,
}

export function numberToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(rgb: RGB): string {
  return "#" + numberToHex(rgb.r) + numberToHex(rgb.g) + numberToHex(rgb.b);
}

export function hexToRgb(hex: string): RGB {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {
		r: 0,
		g: 0,
		b: 0,
	};
}

export function rgbApplyAlpha(rgb: RGB, alpha: number) {
	const clampRgb = (a: number): number => Math.min(Math.max(a, 0), 255);
	rgb.r = clampRgb(Math.round(rgb.r * alpha))
	rgb.g = clampRgb(Math.round(rgb.g * alpha))
	rgb.b = clampRgb(Math.round(rgb.b * alpha))
	return rgb;
}

export function getRgba(rgb: RGB, alpha: number) : string {
	if (rgb.r > 255 || rgb.g > 255 || rgb.b > 255 ||
			rgb.r < 0 	|| rgb.g < 0 	 || rgb.b < 0) {
		return `rgba(255, 255, 255, ${alpha})`;
	}
	return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function getContrastTextColor(rgb: RGB) : string {
	const {r, g, b} = rgb;
	var yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 140 ? Colors.textDarker : Colors.textLighter;
}
