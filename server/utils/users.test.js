//-----------------------------------------------------------------------------
// server/utils/users.test.js
//-----------------------------------------------------------------------------
const expect    = require('expect')

const { Users } = require('./users')

describe('Users', () => {
  let users = null
  beforeEach( () => {
    users = new Users()
    users.users = [
      {id: '1', name: 'Mike', room: 'Node Course'},
      {id: '2', name: 'Marv', room: 'React Course'},
      {id: '3', name: 'Lou',  room: 'Node Course'}
    ]
  })

  it('Adds a new user', () => {
    let users = new Users()
    let user  = {
      id:   '123',
      name: 'Marv',
      room: 'Bills',
    }
    
    let result = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
  })

  it('Returns a user', () => {
    let userId = '2'
    let user   = users.getUser(userId)
    expect(user.id).toBe(userId)
    expect(user.name).toBe('Marv')
  })

  it('Returns undefined when it cannot find a user', () => {
    //* expect(users.getUser('99')).toBe(undefined)
    expect(users.getUser('99')).toNotExist()
  })

  it('Removes a user', () => {
    let user = users.removeUser('2')
    expect(user.id).toBe('2')
    expect(users.users.length).toBe(2)
  })

  it('Does not remove a user', () => {
    let user = users.removeUser('99')
    expect(user).toNotExist()
    expect(users.users.length).toBe(3)
  })

  it('Returns a list of the names in a room', () => {
    expect(users.getUserList('Node Course')).toEqual(['Mike', 'Lou'])
    expect(users.getUserList('React Course')).toEqual(['Marv'])
  })
})
