module.exports = {
  transpileDependencies: [],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3002", // The URL of your backend server
        changeOrigin: true, // Optional: needed for virtual hosted sites
        secure: false // Optional: set to false if you're dealing with self-signed HTTPS certificates
      }
    }
  }
};