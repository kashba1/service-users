const redisUtils = {
    "SLEEP-DASH": "LUNA:SLEEP:DASH:{userId}", // if you need to change the key then change in luna sleep service as well
    "ACTIVITY-DASH": "LUNA:ACTIVITY:DASH:{userId}", // if you need to change the key then change in luna activity service as well
    "LUNA-REGISTER-DATE": "LUNA:DAYS:{userId}",
    "USER-AGE": "LUNA:USER:AGE:{userId}",
    "7_DAYS": 24 * 60 * 60 * 7,
    "14_DAYS": 24 * 60 * 60 * 14,
    "WELCOME-CONSTANT": "LUNA:WELCOME:CONSTANT",
    "WELCOME-MEDIA": "LUNA:WELCOME:MEDIA",
};

export default redisUtils;
