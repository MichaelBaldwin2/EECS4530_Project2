#version 330 core
//
// Directional Vertex shader.  
// Just adjusts normals and position and passes information
// on to the fragment shader.  Should probably consider revising
// it to take an inverse of the normal matrix rather than doing
// it for each vertex.  
// 
uniform mat4 modelingMatrix;
uniform mat4 viewingMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

in vec4 vColor;
in vec4 vPosition;
in vec3 vNormal;

out vec4 Color;
out vec3 Normal;

void main()
{
	mat3 normalMatrixTransform;
	Color = vColor;
	normalMatrixTransform = transpose(inverse(normalMatrix));
	Normal = normalize(normalMatrixTransform*vNormal);
	gl_Position = projectionMatrix * viewingMatrix
		* modelingMatrix * vPosition;
}
