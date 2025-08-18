export default async function middlewareAuth(req) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (!accessToken || !refreshToken) {
    console.error("Missing accessToken or refreshToken in cookies");
    return null;
  }
 
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `accessToken=${accessToken.value}; refreshToken=${refreshToken.value}`,
    },
  };

  console.log("Options:", options);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    options
  )
    .then((res) => res.json())
    .then((res) => res.data);

  const { user } = data ;
  return user;
}
