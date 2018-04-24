using System;
using System.Net;

namespace TwitterConnector
{
    class TwitterConnector
    {
        static void Main(string[] args)
        {
        }

        //Step 1: encode consumer key and secret as base64 seperated by colon
        private string encodeAPIKeys(string consumerKey, string consumerSecret)
        {
            //convert strings to bytes
            var keyBytes = System.Text.Encoding.UTF8.GetBytes(consumerKey);
            var secretBytes = System.Text.Encoding.UTF8.GetBytes(consumerSecret);
            return $"{System.Convert.ToBase64String(keyBytes)}:{System.Convert.ToBase64String(secretBytes)}";
        }

        private string obtainAccessToken(string authToken)
        {
            WebRequest request = WebRequest.Create("https://api.twitter.com/oauth2/token");
            return "";
        }
    }
}
