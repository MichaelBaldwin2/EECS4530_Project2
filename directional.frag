#version 330 core
// Fragment shader for global ambient lighting
// Last update October 30, 2020
// 
// Added mode as a flag.  non-zero value forces 
// white fragments.  Zero value will cause directional
// light code to be used. 
//
uniform vec3 ambientLight;
uniform vec3 directionalLightDirection;
uniform vec3 directionalLightColor;
uniform vec3 halfVector;
uniform float shininess;
uniform float strength;
uniform int   mode;

in vec3 Normal;
in vec4 Color;

out vec4 FragColor;
void main()
{

	if (mode == 0) {
		float diffuse, specular;
		diffuse = max(0.0, dot(Normal, directionalLightDirection));
		specular = max(0.0, dot(Normal, halfVector));
		if (diffuse == 0.0) {
			specular = 0.0;
		} else {
			specular = pow(specular, shininess);
		}
		vec3 scatteredLight = ambientLight + directionalLightColor * diffuse;
		vec3 reflectedLight = directionalLightColor * specular * strength;
		vec3 rgb = clamp(Color.rgb * scatteredLight + reflectedLight, vec3(0.0), vec3(1.0));

		FragColor = vec4(rgb, Color.a);
	} else {
		FragColor = vec4 (Color);
	}
}