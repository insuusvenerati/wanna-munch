module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: "cloudinary",
            providerOptions: {
                cloud_name: env("CLOUDINARY_NAME"),
                api_key: env("CLOUDINARY_KEY"),
                api_secret: env("CLOUDINARY_SECRET"),
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
    "vercel-deploy": {
        enabled: true,
        config: {
            deployHook: process.env.VERCEL_DEPLOY_PLUGIN_HOOK,
            apiToken: process.env.VERCEL_TOKEN,
            appFilter: process.env.VERCEL_DEPLOY_PLUGIN_APP_FILTER,
            teamFilter: process.env.VERCEL_DEPLOY_PLUGIN_TEAM_FILTER,
            roles: ["strapi-super-admin"],
        },
    },
    meilisearch: {
        config: {
            host: process.env.MEILISEARCH_HOST,
            apiKey: process.env.MEILISEARCH_KEY,
        },
    },
});
