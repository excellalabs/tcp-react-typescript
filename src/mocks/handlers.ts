import { rest } from "msw";
import { fakeAxiosData } from "mocks/data/fakeAxiosData";
import fakeEmployee from 'mocks/data/employee';
import { agileSkillCategory } from "./data/category";
import { reactSkill } from "./data/skill";

interface LoginBody {
  username: string,
  password: string
}


export const handlers = [
      
    rest.post<LoginBody>("/api/v1/users/signin", async (req, res, ctx) => {
      const { password } = req.body.user
      const status = (password === 'pass') ? 200 : 401 
      return res(ctx.status(status))
    }),
  
    // TODO: these undefined need to be fixed for tests
    // i.e. in test env the object needs to be fixed to use the correct base url
    rest.get("/undefined/items", async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fakeAxiosData))
    }),
    rest.get("/undefined/items/:id", async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fakeAxiosData[req.params.id]))
    }),
    rest.put("/undefined/items/:id", async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(req.body))
    }),
    rest.delete("/undefined/items/:id", async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fakeAxiosData[req.params.id]))
    }),

    rest.get("/undefined/employee", async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([fakeEmployee]))
    }),
    rest.get("/undefined/skill", async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([reactSkill]))
    }),

    rest.get("/undefined/skill-category", async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([agileSkillCategory]))
    }),

    ////
    rest.get("/api/v1/users", async (req, res, ctx) => {
        
        const users = [{
            id: 1,
            name: "Some Users"
        },
        { 
            id: 2,
            name: "From Mswhandler"
        }]
      return res(
          ctx.status(200),
            ctx.json(users)
        )

      }),
    ];

