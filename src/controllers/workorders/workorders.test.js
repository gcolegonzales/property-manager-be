const WorkOrderController = require('./workorders-controller')
const WorkOrderModel = require('../../models/workorders/workorders-model')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/workorders/workorders-model')

let req, res, next
const mockWorkOrder = {
  name: 'first work order',
  description: 'doing stuff',
  type: 'plumbing',
  status: 'pending',
  comment: 'comment',
  start_date: '1943-03-09T01:00:00Z',
  end_date: '1943-03-09T01:00:00Z',
  unit_id: '1',
  user_id: 'Je1JoLNS6Ee4o8qHjfH7bmRocyD3',
  in_house: true,
}
const mockWorkOrderId = 1

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('WorkOrderController.create', () => {
  it('should be a function', () => {
    expect(typeof WorkOrderController.create).toBe('function')
  })

  it('should call WorkOrderModel.add', async () => {
    await WorkOrderController.create(req, res, next)
    expect(WorkOrderModel.add).toHaveBeenCalledWith(req.body)
  })

  it('should return response 201 and json data', async () => {
    WorkOrderModel.add.mockReturnValue(mockWorkOrder)
    await WorkOrderController.create(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockWorkOrder)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot create workorder'}
    const rejectedPromise = Promise.reject(errorMessage)

    WorkOrderModel.add.mockReturnValue(rejectedPromise)
    await WorkOrderController.create(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe('WorkOrderController.readAllByUser', () => {
  it('should be a function', () => {
    expect(typeof WorkOrderController.readAllByUser).toBe('function')
  })

  it('should call WorkOrderModel.getAll', async () => {
    await WorkOrderController.readAllByUser(req, res, next)
    expect(WorkOrderModel.getAll).toHaveBeenCalledWith()
  })

  it('should  return status 200 and json data', async () => {
    WorkOrderModel.getAll.mockReturnValue(mockWorkOrder)
    await WorkOrderController.readAllByUser(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockWorkOrder)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot get work orders'}
    const rejectedPromise = Promise.reject(errorMessage)

    WorkOrderModel.getAll.mockReturnValue(rejectedPromise)
    await WorkOrderController.readAllByUser(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe('WorkOrderController.readById', () => {
  it('should be a function', () => {
    expect(typeof WorkOrderController.readById).toBe('function')
  })

  it('should call WorkOrderModel.getById', async () => {
    req.params.id = mockWorkOrderId
    await WorkOrderController.readById(req, res, next)
    expect(WorkOrderModel.getById).toHaveBeenCalledWith(req.params.id)
  })

  it('should return status 200 and json data', async () => {
    WorkOrderModel.getById.mockReturnValue(mockWorkOrder)
    await WorkOrderController.readById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockWorkOrder)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot get work order'}
    const rejectedPromise = Promise.reject(errorMessage)

    WorkOrderModel.getById.mockReturnValue(rejectedPromise)
    await WorkOrderController.readById(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    WorkOrderModel.getById.mockReturnValue(null)
    await WorkOrderController.readById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

describe('WorkOrderController.updateById', () => {
  it('should be a function', () => {
    expect(typeof WorkOrderController.updateById).toBe('function')
  })

  it('should call WorkOrderModel.update', async () => {
    req.params.id = mockWorkOrderId
    req.body = mockWorkOrder
    await WorkOrderController.updateById(req, res, next)
    expect(WorkOrderModel.update).toHaveBeenCalledWith(req.params.id, req.body)
  })

  it('should return status 200 and json data', async () => {
    WorkOrderModel.update.mockReturnValue(mockWorkOrder)
    await WorkOrderController.updateById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(mockWorkOrder)
  })

  it('should handle errors', async () => {
    const errorMessage = {message: 'cannot update work order'}
    const rejectedPromise = Promise.reject(errorMessage)

    WorkOrderModel.update.mockReturnValue(rejectedPromise)
    await WorkOrderController.updateById(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it('should handle 404', async () => {
    WorkOrderModel.update.mockReturnValue(null)
    await WorkOrderController.updateById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})
