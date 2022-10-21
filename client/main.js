const triggerPush = document.getElementById("btnSub");
const triggerUnPush = document.getElementById("btnUnsub");
const broadcast = new BroadcastChannel('txn-validator');
const currentUserId = "2ce748be-003e-4c7f-a204-2fb3098a0e16";

async function triggerPushNotification() {
  if ("serviceWorker" in navigator) {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: "ed6e47de-ab49-489a-8982-eeec598b2b8b",
    });

    beamsClient
      .getUserId()
      .then((userId) => {
        // Check if the Beams user matches the user that is currently logged in
        if (userId !== currentUserId) {
          // Unregister for notifications
          return beamsClient.stop();
        }
      })
      .catch(console.error);

    const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
      url: "http://localhost:5000/pusher/beams-auth",
    });

    await beamsClient
      .start()
      .then((beamsClient) => beamsClient?.getDeviceId())
      .then((deviceId) =>
        console.log("Successfully registered with Beams. Device ID:", deviceId)
      )
      .then(() => beamsClient?.setUserId(currentUserId, beamsTokenProvider))
      .catch(console.error);
  } else {
    console.error("Service workers are not supported in this browser");
  }
}

triggerPush.addEventListener("click", () => {
  triggerPushNotification().catch((error) => console.error(error));
});

triggerUnPush.addEventListener("click", () => {
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: "f1065ae4-169f-4a65-a36d-fd97525e13cc",
  });
  beamsClient
    .getUserId()
    .then((userId) => {
      // Unregister for notifications
      return beamsClient.stop();
    })
    .catch(console.error);
});





