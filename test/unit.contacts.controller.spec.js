const {
  getAll,
  create,
  remove,
  getById,
  update
} = require('../controllers/contacts')
const Contacts = require('../model/contacts')

jest.mock("../model/contacts")

describe("Unit test contacts controllers", () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 3 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
  const next = jest.fn()

  it('without contact in Db', async () => {
    Contacts.updateContact = jest.fn()
      const result = await update(req, res, next)
      expect(result.status).toEqual("error")
      expect(result.code).toEqual(404)
      expect(result.message).toEqual("Not Found")
  });

  test('with contact in DB', async () => {
    Contacts.updateContact = jest.fn(() => true)
    const result = await update(req, res, next)

    expect(result.status).toEqual('success')
    expect(result.code).toEqual(200)
    expect(result.data).toEqual({ contact: true })
  });

  it('Db return an exception', async () => {
    Contacts.updateContact = jest.fn(() => {
      throw new Error("Ups")
    })
    await update(req, res, next)
    expect(next).toHaveBeenCalled()
  });


});

