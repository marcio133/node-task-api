const taskDataSource = {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
}

module.exports = taskDataSource;