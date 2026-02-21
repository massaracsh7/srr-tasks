import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

const runtime = globalThis as { ngServerMode?: boolean };
runtime.ngServerMode = true;
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
runtime.ngServerMode = false;
