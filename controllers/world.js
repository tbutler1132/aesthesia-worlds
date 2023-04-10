import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: '05d4xked',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-03-26',
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

export const getWorldBranches = async (req, res) => {
    const { id } = req.params
    try {
        const world = await client.fetch(`*[_type == "world" && _id == "${id}"]{branches[] ->{title, _id, _createdAt, description, artwork ->{file{asset ->{url}}}, file{asset ->{url}}}}`)
        return res.status(200).json(world[0].branches)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Failed to get world branches")
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

export const getWorldSubNavLinks = async (req, res) => {
    const { id } = req.params
    const navLinks = ['artworks', 'videos', 'cores']
    const finalObj = {links: []}
    let linkSubstring = 'title, '
    const buildQuery = (navLinks) => {
        navLinks.forEach(link => {
            linkSubstring = linkSubstring + link + ', '
        })

        return `*[_type == "world" && _id == "${id}"]{${linkSubstring}}`
    }
    try {
        const test = await client.fetch(buildQuery(navLinks))
        console.log(test[0])
        navLinks.forEach(el => {
            if(test[0][el].length){
                finalObj.push()
            } else {
                finalObj[el] = false
            }
        })
        finalObj['title'] = test[0]['title']
        return res.status(200).json(finalObj)
    } catch (error) {
        console.log(error)
    }
}