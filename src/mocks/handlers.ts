import { rest } from "msw";

export const handlers = [
      rest.get("http://localhost:3000/api/v1/users", async (req, res, ctx) => {
        
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

