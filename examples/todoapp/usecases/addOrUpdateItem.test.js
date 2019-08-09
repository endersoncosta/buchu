const { addOrUpdateItem } = require('./addOrUpdateItem')
const { Ok, Err } = require('../../../src/grounds')
const assert = require('assert')

describe('Add Or Update Item Use Case', () => {

    describe('Add Item', () => {

        it('Should Add Item ', async () => {

            // Given
            const injection = {
                ItemRepository: class {
                    firstLike(item) { return null }
                    save(item) { item.id = 100; return Ok() }
                }
            }
            const req = {
                listId: 1,
                item: { id: 10, name: "Do not forget this", position: 9 }
            }

            // When
            const uc = addOrUpdateItem()
            uc.inject(injection)
            const ret = await uc.run(req)

            // Then
            assert.ok(ret.isOk)
            assert.equal(ret.value.item.id, 100)
            assert.equal(ret.value.item.name, "Do not forget this")
        })
    })

    describe('Update Item', () => {

        it('Should Update Item ', async () => {

            // Given
            const injection = {
                ItemRepository: class {
                    firstLike(item) { return { id: 200, name: "Forget this", position: 2 } }
                    save(item) { return Ok() }
                }
            }
            const req = {
                listId: 1,
                item: { id: 10, name: "Do not forget this", position: 10 }
            }

            // When
            const uc = addOrUpdateItem()
            uc.inject(injection)
            const ret = await uc.run(req)

            // Then
            assert.ok(ret.isOk)
            assert.equal(ret.value.item.id, 200)
            assert.equal(ret.value.item.name, "Do not forget this")
        })
    })
})