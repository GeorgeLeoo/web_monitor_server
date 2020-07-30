import Response from '../lib/Response/Response'
import ProjectService from '../service/ProjectService'

class ProjectController {
    // TODO: 查询Project
    async get(ctx) {
        const {userId} = ctx.request.query
        const options = {
            userId: userId,
            isDelete: 1
        }
        const result = await ProjectService.find(options)
        new Response(ctx).send(result)
    }

    // TODO: 通过id查询Project
    async getByProjectId(ctx) {
        const {userId, projectId} = ctx.request.query
        if (!userId) {
            new Response(ctx).send412('userId 不能为空')
            return
        }
        if (!projectId) {
            new Response(ctx).send412('projectId 不能为空')
            return
        }
        const options = {
            id: projectId,
            userId,
            isDelete: 1
        }
        const result = await ProjectService.find(options)
        new Response(ctx).send(result)
    }

    // TODO: 创建Project
    async create(ctx) {
        const {userId, projectName} = ctx.request.body
        const options = {
            userId,
            projectName,
            projectKey: projectName.replace(/\s/g, '_') + new Date().getTime()
        }
        const result = await ProjectService.create(options)
        result.msg = '创建项目成功'
        new Response(ctx).send(result)
    }

    // TODO: 删除Project
    async delete(ctx) {
        const {id} = ctx.request.query
        if (!id) {
            new Response(ctx).send412('id 不能为空')
            return
        }
        const options = {
            id
        }
        const result = await ProjectService.delete(options)
        result.msg = '删除成功'
        new Response(ctx).send(result)
    }
}

export default new ProjectController()
