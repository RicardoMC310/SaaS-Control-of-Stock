import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  // Plugins necessários para resolver os path aliases (@/*)
  test: {
    // Ambiente Node (backend)
    environment: 'node',
    
    // Habilitar globals (describe, it, expect) sem importar
    globals: true,
    
    // Arquivos de teste
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '**/*.d.ts'],
    
    // Setup opcional
    // setupFiles: ['./vitest.setup.ts'],
    
    // Cobertura
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.{test,spec}.ts',
        'src/**/*.d.ts',
        'src/**/index.ts',
      ],
    },
    
    // Importante: Respeitar módulos ES do Node
    server: {
      deps: {
        // Forçar inline de módulos que precisam ser transformados
        inline: [],
      },
    },
    
    // Timeouts
    testTimeout: 10000,
    hookTimeout: 5000,
    
    // Isolar ambiente entre testes
    isolate: true,
    
    // Mostrar stack traces
    printConsoleTrace: true,
  },
  
  // Resolver aliases manualmente (fallback)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});