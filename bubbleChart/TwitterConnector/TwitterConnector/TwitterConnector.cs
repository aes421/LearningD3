using System;
using System.Net;

namespace TwitterConnector
{
    class TwitterConnector
    {
        static void Main(string[] args)
        {
            var authToken = TwitterConnector.encodeAPIKeys("q3KnAwRlZQHH5h1qkTZE1WoEN", "HmoJsSomJADXkj9qtHManEZk9GMm3K8rYkilQkgmgbpQvU9NIk");
            TwitterConnector.obtainAccessToken(authToken);
        }

        //Step 1: encode consumer key and secret as base64 seperated by colon
        static string encodeAPIKeys(string consumerKey, string consumerSecret)
        {
            //convert strings to bytes
            var keyBytes = System.Text.Encoding.UTF8.GetBytes(consumerKey);
            var secretBytes = System.Text.Encoding.UTF8.GetBytes(consumerSecret);
            return $"{System.Convert.ToBase64String(keyBytes)}:{System.Convert.ToBase64String(secretBytes)}";
        }

        static string obtainAccessToken(string authToken)
        {
            WebClient client = new WebClient();
            client.Headers.Add(HttpRequestHeader.Authorization, $"Basic {authToken}");
            client.Headers.Add(HttpRequestHeader.ContentType, "application/x-www-form-urlencoded;charset=UTF-8");

            var body = System.Text.Encoding.UTF8.GetBytes("grant_type=client_credentials");
            var response = client.UploadData(new Uri("https://api.twitter.com/oauth2/token"), "POST", body);

            return "";
        }
    }
}
