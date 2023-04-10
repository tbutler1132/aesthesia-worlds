import express from 'express'
import { getWorlds, getWorld, getWorldCores, getWorldArtworks, getWorldVideos, getWorldSubNavLinks, getWorldBranches } from '../controllers/world.js'

const router = express.Router()

router.get('/', getWorlds)
router.get('/:id', getWorld)
router.get('/:id/cores', getWorldCores)
router.get('/:id/artworks', getWorldArtworks)
router.get('/:id/videos', getWorldVideos)
router.get('/:id/subNavLinks', getWorldSubNavLinks)
router.get('/:id/branches', getWorldBranches)

export default router