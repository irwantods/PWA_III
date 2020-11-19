var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BCP9Ojn3eZAqxHm0akY6iMBYZUDlPskRsA4_7sx0A6IZ2jb_iq9w4IPHrcRuau6x9WoOeM1xVnaNqBd6MQYi-sU",
    "privateKey": "oeNRlIfPIEvS7TMsaIhdEMrHkxEqoDBD-Ofcqj0QW9I"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "  https://fcm.googleapis.com/fcm/send/dqFlfA4d-4Y:APA91bHwuzGm4PZDTUf8kbOwrmJu8Wlc1OdDgA5MGIdeKd1Cf8TgHBDtzy9_cg2Jv2G0r-pWN7DC2so06J3-w_i0wIN4kMWB2yrjmzWoZdxVheTufmGTQJoEOS-FlZ9Wdudp_03KjYdu",
    "keys": {
        "p256dh": "BKRwWeuKM/Q+fJnSv9w0WwwYXS9sqKDQGOTLIaAeb4SFi+3tp2tp22pt1d5fv3hlGkj4pNnC0iB9JC1CfH9bcCk=",
        "auth": "VHiZPk7vcxH1l2sWxRqLEQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi! hahahahaha';

var options = {
    gcmAPIKey: '521247596801',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);