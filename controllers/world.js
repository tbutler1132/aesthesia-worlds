import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: '05d4xked',
    dataset: 'production',
    useCdn: false, // set to `true` to fetch from edge cache
    apiVersion: '2023-03-26', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  })

export const getWorlds = async (req, res) => {
    const query = '*[_type == "world"]{_id, title, "cover_art": *[_type == "artwork" && primary == true && references(^._id)]{file{asset ->{url}}}}'
    try {
        const worlds = await client.fetch(query)
        return res.status(200).json(worlds)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Failed to get worlds")
    }
}

export const getWorld = async (req, res) => {
    const { id } = req.params
    try {
        const world = await client.fetch(`*[_type == "world" && _id == "${id}"]{_id, title, "cover_art": *[_type == "artwork" && primary == true && references(^._id)]{file{asset ->{url}}}, cores[] ->{version, _createdAt, file{asset ->{url}}}}`)
        return res.status(200).json(world[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json("Failed to get world")
    }
}

export const getWorldCores = async (req, res) => {
    const { id } = req.params
    try {
        const world = await client.fetch(`*[_type == "world" && _id == "${id}"]{cores[] ->}`)
        return res.status(200).json(world[0].cores)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Failed to get world cores")
    }
}

export const getWorldArtworks = async (req, res) => {
    const { id } = req.params
    try {
        const world = await client.fetch(`*[_type == "world" && _id == "${id}"]{artworks[] ->{primary, title, _id, file{asset ->{url}}}}`)
        return res.status(200).json(world[0].artworks)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Failed to get world art")
    }
}

export const getWorldVideos = async (req, res) => {
    const { id } = req.params
    try {
        const world = await client.fetch(`*[_type == "world" && _id == "${id}"]{videos[] ->{primary, title, _id, file{asset ->{url}}}}`)
        return res.status(200).json(world[0].videos)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Failed to get world videos")
    }
}