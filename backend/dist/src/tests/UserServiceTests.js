"use strict";
// import UserService from "../logic/userService";
// import User from "../repository/db/User"; // Adjust the import path as needed
// import bcrypt from "bcrypt";
// import { jest } from "@jest/globals";
// // Define types for the mock return values and functions
// interface MockUserInstance {
//   id: number;
//   username: string;
//   password: string;
//   toJSON: () => { id: number; username: string };
//   destroy: jest.Mock;
// }
// // Mock the bcrypt and User model
// jest.mock("bcrypt", () => ({
//   hash: jest.fn(),
//   compare: jest.fn(),
// }));
// jest.mock("../repository/db/User", () => ({
//   __esModule: true,
//   default: {
//     create: jest.fn(),
//     findByPk: jest.fn(),
//     findOne: jest.fn(),
//   },
// }));
// describe("UserService", () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });
//   test("addUser should create a new user", async () => {
//     (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
//     (User.create as jest.Mock).mockResolvedValue({
//       id: 1,
//       username: "testuser",
//       password: "hashedPassword",
//       toJSON: () => ({ id: 1, username: "testuser" }),
//     } as MockUserInstance);
//     const result = await UserService.addUser("testuser", "password");
//     expect(result).toBeTruthy();
//     expect(User.create).toHaveBeenCalledWith({
//       username: "testuser",
//       password: "hashedPassword",
//     });
//   });
//   test("removeUser should delete an existing user", async () => {
//     const mockDestroy = jest.fn().mockResolvedValue(true);
//     (User.findByPk as jest.Mock).mockResolvedValue({
//       id: 1,
//       username: "testuser",
//       password: "hashedPassword",
//       toJSON: () => ({ id: 1, username: "testuser" }),
//       destroy: mockDestroy,
//     } as MockUserInstance);
//     const result = await UserService.removeUser(1);
//     expect(result).toBeTruthy();
//     expect(User.findByPk).toHaveBeenCalledWith(1);
//     expect(mockDestroy).toHaveBeenCalled();
//   });
//   test("getUser should return a user if found", async () => {
//     (User.findByPk as jest.Mock).mockResolvedValue({
//       id: 1,
//       username: "testuser",
//       password: "hashedPassword",
//       toJSON: () => ({ id: 1, username: "testuser" }),
//     } as MockUserInstance);
//     const user = await UserService.getUser(1);
//     expect(user).toEqual({ id: 1, username: "testuser" });
//     expect(User.findByPk).toHaveBeenCalledWith(1);
//   });
//   test("authenticateUser should authenticate a user with correct credentials", async () => {
//     (bcrypt.compare as jest.Mock).mockResolvedValue(true);
//     (User.findOne as jest.Mock).mockResolvedValue({
//       dataValues: { username: "testuser", password: "hashedPassword" },
//     } as MockUserInstance);
//     const user = await UserService.authenticateUser("testuser", "password");
//     expect(user).toBeDefined();
//     expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
//   });
//   // Additional test cases can be added here
// });
