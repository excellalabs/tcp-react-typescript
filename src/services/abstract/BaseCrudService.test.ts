import { BaseCrudService, IBaseCrudService } from "./BaseCrudService";
import { IBaseItem } from "../../models/BaseItem.interface";
import { fakeAxiosData } from "mocks/data/fakeAxiosData";

interface ITestItem extends IBaseItem {
  name: string;
  cost: number;
}

class TestService extends BaseCrudService<ITestItem>
  implements IBaseCrudService<ITestItem> {
  endpoint = "/items";
}

describe("BaseCrudService", () => {
  let service: TestService;

  beforeEach(() => {
    service = new TestService("token");
  });

  it("fetches all items", async () => {
    await service.get().then((res) => {
      expect(res.data.length).toBe(3);
    });
  });

  it("gets by id", async () => {
    const id = 1;
    await service.getById(id).then((res) => {
      expect(res.data).toEqual(fakeAxiosData[id]);
    });
  });

  it("calls delete", async () => {
    await service.delete(1).then((res) => {
      expect(res.data).toEqual(fakeAxiosData[1]);
    });
  });
  it("calls update", async () => {
    const id = 1;
    const obj = fakeAxiosData[id];
    obj.name = "fooism"
    await service.update(obj).then((res) => expect(res.data).toEqual(obj));
  });
});
