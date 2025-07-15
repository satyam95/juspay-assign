import '@testing-library/jest-dom';
// Optionally, add any global setup for tests here. 

// Mock ResizeObserver for Vitest/browserless test environment
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver; 