const taskService = require("../src/services/task.service");
const taskDataSource = require('./mocks/data-source.mock');
const { TaskNotFoundException } = require("../src/exceptions/task.exception");


jest.mock('../src/entities/task.entity', () => {
    const taskDataSource = require('./mocks/data-source.mock');
    return taskDataSource;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('TaskService', () => {
    it('listAll function should return tasksList', async () => {
        const tasksList = [
            {
                title: 'First Task',
                description: 'First description',
                priority: 1,
                isConcluded: false,
                get: jest.fn().mockReturnValue(1)
            },
            {
                title: 'Second Task',
                description: 'Second description',
                priority: 1,
                isConcluded: false,
                get: jest.fn().mockReturnValue(2)
            },
        ];

        taskDataSource.findAll.mockResolvedValue(tasksList);

        const result = await taskService.listAll();

        expect(result).toStrictEqual([1, 2]);
        expect(taskDataSource.findAll).toHaveBeenCalledTimes(1);

    });

    it('create must return created task', async () => {
        const task = {
            title: 'Second Task',
            description: 'Second description',
            priority: 1,
        }

        taskDataSource.create.mockResolvedValue('Created Task');

        const result = await taskService.create(task);

        expect(result).toContain('Created Task');
        expect(taskDataSource.create).toHaveBeenCalledTimes(1);
        expect(taskDataSource.create).toHaveBeenCalledWith({ ...task, isConcluded: false });

    });


    it('getById must return the mocked task', async () => {
        const task = {
            title: 'Second Task',
            description: 'Second description',
            priority: 1,
        }

        taskDataSource.findByPk.mockResolvedValue(task);

        const result = await taskService.getById(1);

        expect(result).toBe(task);
        expect(taskDataSource.findByPk).toHaveBeenCalledTimes(1);
        expect(taskDataSource.findByPk).toHaveBeenCalledWith(1);

    });

    it('updateStatus must return the mocked task', async () => {
        const task = {
            title: 'Second Task',
            description: 'Second description',
            priority: 1,
        }

        taskDataSource.findByPk.mockResolvedValue(task);
        taskDataSource.update.mockResolvedValue([1, task]);

        const result = await taskService.updateStatus(1, { isConcluded: true });

        expect(result).toBe(task);
        expect(taskDataSource.findByPk).toHaveBeenCalledTimes(1);
        expect(taskDataSource.findByPk).toHaveBeenCalledWith(1);
        expect(taskDataSource.update).toHaveBeenCalledTimes(1);
        expect(taskDataSource.update).toHaveBeenCalledWith({ isConcluded: true },
            { where: { idTask: 1 }, returning: true, plain: true });

    });


    it('updateTask must return the mocked task', async () => {
        const task = {
            title: 'Second Task',
            description: 'Second description',
            priority: 1,
        }

        taskDataSource.findByPk.mockResolvedValue(task);
        taskDataSource.update.mockResolvedValue([1, task]);

        const result = await taskService.updateTask(1, task);
        expect(result).toBe(task);
        expect(taskDataSource.findByPk).toHaveBeenCalledTimes(1);
        expect(taskDataSource.findByPk).toHaveBeenCalledWith(1);
        expect(taskDataSource.update).toHaveBeenCalledTimes(1);
        expect(taskDataSource.update).toHaveBeenCalledWith(task,
            { where: { idTask: 1 }, returning: true, plain: true });

    });

    it('delete must return the mocked task', async () => {
        const task = {
            title: 'Second Task',
            description: 'Second description',
            priority: 1,
        }

        taskDataSource.findByPk.mockResolvedValue(task);
        taskDataSource.destroy.mockResolvedValue(task);

        const result = await taskService.deleteTask(1);

        expect(result).toBe(task);
        expect(taskDataSource.findByPk).toHaveBeenCalledTimes(1);
        expect(taskDataSource.findByPk).toHaveBeenCalledWith(1);
        expect(taskDataSource.destroy).toHaveBeenCalledTimes(1);
        expect(taskDataSource.destroy).toHaveBeenCalledWith({ where: { idTask: 1 } });

    });

    it('delete must return an error', async () => {
        const task = {
            title: 'Second Task',
            description: 'Second description',
            priority: 1,
        }

        taskDataSource.findByPk.mockResolvedValue(null);
        try {
            const result = await taskService.deleteTask(1);

        } catch (error) {
            expect(error).toBeInstanceOf(TaskNotFoundException)
        }
    });

});