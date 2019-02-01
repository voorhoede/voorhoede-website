const test = require('ava')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const fetchResponseStub = {
  json: sinon.stub().resolves({ data: 'bar' })
}
const okResponse = {
  ok: true
}

const nOkResponse = {
  ok: false
}

test.beforeEach(t => {
  const stub = sinon.stub()
  t.context.fetchStub = stub
  t.context.queryApi = proxyquire('../../../../src/client/lib/query-api', {
    'node-fetch': stub
  })
})

test.afterEach(() => sinon.restore())

test('query api with all requests failing', async t => {
  const { fetchStub, queryApi } = t.context

  fetchStub.resolves({
    ...nOkResponse,
    ...fetchResponseStub
  })

  await t.throwsAsync(queryApi({}), null, 'fails if all attempts fail')
  t.true(fetchStub.called, 'queryApi attempts to fetch data from api')
  t.is(fetchStub.callCount, 5, '5 attempts are made to fetch the data')
})

test('query api with first 3 requests failing', async t => {
  const { fetchStub, queryApi } = t.context

  // fail first three calls
  fetchStub.resolves({
    ...nOkResponse,
    ...fetchResponseStub
  })

  // Succeed the fourth call
  fetchStub.onCall(3).resolves({
    ...okResponse,
    ...fetchResponseStub
  })

  await t.notThrowsAsync(queryApi({}), null, 'retry & succeed works')
  t.is(fetchStub.callCount, 4, '4 attempts are made to fetch the data')
})

test('query api and succeed immediately', async t => {
  const { fetchStub, queryApi } = t.context

  // instant success
  fetchStub.resolves({
    ...okResponse,
    ...fetchResponseStub
  })

  await t.notThrowsAsync(queryApi({}), null, 'success')
  t.is(fetchStub.callCount, 1, '1 attempt is made to fetch the data')
})
