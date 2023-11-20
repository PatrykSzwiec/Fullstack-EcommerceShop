const getUserIdFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');
  const encodedPayload = tokenParts[1];
  const decodedPayload = atob(encodedPayload);
  const payloadObj = JSON.parse(decodedPayload);
  const userId = payloadObj.sub;

  return userId;
};

export default getUserIdFromToken;