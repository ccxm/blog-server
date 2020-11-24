import { RouterBase } from '../public-modules/routerBase'
import { Gather, gatherInstance } from '../controllers/gather'

export class GatherRouter extends RouterBase {
    public controller: Gather
    constructor(app: any) {
        super(app, '/gather', gatherInstance)
    }

    addRouter(): void {
        this.router.get('/tag-list', gatherInstance.getTagList)
        this.router.post('/tag', gatherInstance.addTag)
    }
}