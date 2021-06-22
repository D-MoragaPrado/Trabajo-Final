"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var manejo_admin_service_1 = require("./manejo-admin.service");
describe('ManejoAdminService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(manejo_admin_service_1.ManejoAdminService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
