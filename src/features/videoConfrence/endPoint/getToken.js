const endPoint = 'https://prod-in2.100ms.live/hmsapi/videoConfresnce.app.100ms.live/';
const room_id = '6391933faee54625da653b5c';

export default async function getToken(role) {
  const response = await fetch(`${endPoint}api/token`, {
    method: 'POST',
    body: JSON.stringify({
      user_id: '620a9b8971bd215ae0421bd5',
      role: role,
      room_id,
    }),
  });

  const { token } = await response.json();

  return token;
 
}