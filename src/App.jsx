import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./App.css";
import Picker from "../src/components/picker/picker";

function App() {
  const [authCode, setAuthCode] = useState("");
  const [spredSheetList, setSpredSheetList] = useState([]);

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const api_key = import.meta.env.VITE_API_KEY;

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setAuthCode(codeResponse),
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "auth-code",
  });

  const newAccessTokenUsingRefreshToken = async () => {
    let token_url = "https://accounts.google.com/o/oauth2/token";
    let data = {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    };
    try {
      const tokenResponse = await axios.post(token_url, data);
      console.log("tokenResponse", tokenResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const accessSpreadsheet = async () => {
    try {
      const redirectUri = "http://localhost:5173";
      const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          code: authCode?.code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }
      );

      console.log("TokenResponse", tokenResponse);

      const accessToken = tokenResponse.data.access_token;

      console.log("Access token 🚀", accessToken);

      axios
        .get("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("User Info:", response.data);
          console.log("User Email:", response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });

      // Make the API v3 call to retrieve list of spreadsheets
      const files = await axios.get(
        "https://www.googleapis.com/drive/v3/files?",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("files", files);

      // Make the API  v2 call to retrieve list of spreadsheets
      const response = await axios.get(
        "https://www.googleapis.com/drive/v2/files?",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("response", response);
      const spreadsheetData = response.data;
      const fitleredData = spreadsheetData?.items?.filter(
        (item) => item?.mimeType == "application/vnd.google-apps.spreadsheet"
      );

      console.log("SpredsheetList 🚀", fitleredData);

      setSpredSheetList(fitleredData);
    } catch (error) {
      console.log("error 🚀", error);
    }
  };

  return (
    <>
      <div>
        <div style={{ margin: 10 }}>
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>

        <div style={{ margin: 10 }}>
          <button onClick={() => accessSpreadsheet()}>
            {" "}
            View Spredsheet 🚀{" "}
          </button>
        </div>
        <div style={{ margin: 10 }}>
          <button onClick={() => newAccessTokenUsingRefreshToken()}>
            {" "}
            New Refresh Token 🚀{" "}
          </button>
        </div>
        <div>
          <Picker
            clientId={clientId}
            clientSecret={clientSecret}
            api_key={api_key}
          />
        </div>

        <h2>Spreadsheets </h2>
        {spredSheetList.map((item) => {
          return <p style={{ margin: 20 }}>{item.title}</p>;
        })}
      </div>
    </>
  );
}

export default App;
