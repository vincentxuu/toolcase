#!/usr/bin/env node

/**
 * 自動為工具頁面加入 SEO 元件
 * - Breadcrumbs 視覺化元件
 * - BreadcrumbSchema (JSON-LD)
 * - ToolSchema (JSON-LD)
 */

const fs = require('fs');
const path = require('path');

// 從 page.tsx 檔案中提取工具名稱和 URL
function extractToolInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // 提取 canonical URL
  const canonicalMatch = content.match(/canonical:\s*['"]https:\/\/toolcase\.cc\/([^'"]+)['"]/);
  const slug = canonicalMatch ? canonicalMatch[1] : null;

  // 提取 title 中的工具名稱（去掉後綴）
  const titleMatch = content.match(/title:\s*['"]([^-|]+)(?:\s*-[^'"]*)?['"]/);
  const toolName = titleMatch ? titleMatch[1].trim() : null;

  // 提取 description
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
  const description = descMatch ? descMatch[1].trim() : null;

  // 判斷是否為中文頁面
  const isZhTw = filePath.includes('/zh-tw/');

  return { slug, toolName, description, isZhTw };
}

// 檢查檔案是否已經有 SEO 元件
function hasSeoComponents(content) {
  return content.includes('BreadcrumbSchema') &&
         content.includes('ToolSchema') &&
         content.includes('Breadcrumbs');
}

// 生成新的 imports
function generateImports(existingContent) {
  const imports = [];

  if (!existingContent.includes("import Breadcrumbs from")) {
    imports.push("import Breadcrumbs from '@/components/shared/Breadcrumbs'");
  }
  if (!existingContent.includes("import BreadcrumbSchema from")) {
    imports.push("import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'");
  }
  if (!existingContent.includes("import ToolSchema from")) {
    imports.push("import ToolSchema from '@/components/seo/ToolSchema'");
  }

  return imports;
}

// 生成 Schema 元件的 JSX
function generateSchemaJsx(toolName, description, slug, isZhTw) {
  const baseUrl = isZhTw ? 'https://toolcase.cc/zh-tw' : 'https://toolcase.cc';
  const homeUrl = 'https://toolcase.cc';
  const toolUrl = isZhTw ? `https://toolcase.cc/zh-tw/${slug}` : `https://toolcase.cc/${slug}`;
  const homeName = isZhTw ? '首頁' : 'Home';

  return `      <BreadcrumbSchema
        items={[
          { name: '${homeName}', url: '${homeUrl}' },
          { name: '${toolName}', url: '${toolUrl}' },
        ]}
      />
      <ToolSchema
        name="${toolName}"
        description="${description}"
        url="${toolUrl}"
        category="UtilitiesApplication"
      />`;
}

// 生成 Breadcrumbs 元件的 JSX
function generateBreadcrumbsJsx(toolName, isZhTw) {
  const homeName = isZhTw ? '首頁' : 'Home';
  const homeHref = isZhTw ? '/zh-tw' : '/';

  return `        <Breadcrumbs
          items={[
            { name: '${homeName}', href: '${homeHref}' },
            { name: '${toolName}' },
          ]}
        />`;
}

// 處理單個檔案
function processFile(filePath, dryRun = false) {
  console.log(`\n處理: ${filePath}`);

  const content = fs.readFileSync(filePath, 'utf-8');

  // 檢查是否已經有 SEO 元件
  if (hasSeoComponents(content)) {
    console.log('  ⏭️  已經有 SEO 元件，跳過');
    return { success: false, reason: 'already-has-seo' };
  }

  // 提取工具資訊
  const { slug, toolName, description, isZhTw } = extractToolInfo(filePath);

  if (!slug || !toolName || !description) {
    console.log('  ❌ 無法提取必要資訊');
    console.log(`     slug: ${slug}, toolName: ${toolName}, description: ${description ? 'ok' : 'missing'}`);
    return { success: false, reason: 'missing-info' };
  }

  console.log(`  📝 工具名稱: ${toolName}`);
  console.log(`  🔗 Slug: ${slug}`);
  console.log(`  🌐 語言: ${isZhTw ? '繁體中文' : 'English'}`);

  // 生成新的 imports
  const newImports = generateImports(content);

  // 找到最後一個 import 的位置
  const importLines = content.split('\n');
  let lastImportIndex = -1;
  for (let i = 0; i < importLines.length; i++) {
    if (importLines[i].trim().startsWith('import ')) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex === -1) {
    console.log('  ❌ 找不到 import 語句');
    return { success: false, reason: 'no-imports' };
  }

  // 插入新的 imports
  let updatedContent = content;
  if (newImports.length > 0) {
    const lines = content.split('\n');
    lines.splice(lastImportIndex + 1, 0, ...newImports);
    updatedContent = lines.join('\n');
  }

  // 找到 export default function 的位置
  const functionMatch = updatedContent.match(/export default function \w+\(\) \{/);
  if (!functionMatch) {
    console.log('  ❌ 找不到 export default function');
    return { success: false, reason: 'no-function' };
  }

  // 找到 return 語句的位置
  const returnMatch = updatedContent.match(/return \(/);
  if (!returnMatch) {
    console.log('  ❌ 找不到 return 語句');
    return { success: false, reason: 'no-return' };
  }

  // 檢查 return 後面是否已經有 <> 或 <>...</>
  const afterReturn = updatedContent.substring(updatedContent.indexOf('return (') + 8);
  const hasFragment = afterReturn.trim().startsWith('<>');

  // 生成 Schema JSX
  const schemaJsx = generateSchemaJsx(toolName, description, slug, isZhTw);
  const breadcrumbsJsx = generateBreadcrumbsJsx(toolName, isZhTw);

  // 替換內容
  if (hasFragment) {
    // 如果已經有 fragment，在 <> 後面插入 Schema
    updatedContent = updatedContent.replace(
      /return \(\s*<>/,
      `return (
    <>
${schemaJsx}`
    );
  } else {
    // 如果沒有 fragment，需要加上 fragment 並插入 Schema
    updatedContent = updatedContent.replace(
      /return \(/,
      `return (
    <>
${schemaJsx}`
    );

    // 在最後的 ) 之前加上 </>
    const lines = updatedContent.split('\n');
    let bracketCount = 0;
    let returnFound = false;
    let closingIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('return (')) {
        returnFound = true;
        bracketCount = 1;
        continue;
      }

      if (returnFound) {
        for (const char of lines[i]) {
          if (char === '(') bracketCount++;
          if (char === ')') bracketCount--;
        }

        if (bracketCount === 0) {
          closingIndex = i;
          break;
        }
      }
    }

    if (closingIndex > -1) {
      lines.splice(closingIndex, 0, '    </>');
      updatedContent = lines.join('\n');
    }
  }

  // 在第一個 <div className="tool-container"> 後面插入 Breadcrumbs
  updatedContent = updatedContent.replace(
    /(<div className="tool-container">)/,
    `$1\n${breadcrumbsJsx}`
  );

  if (dryRun) {
    console.log('  🔍 DRY RUN - 不會寫入檔案');
    console.log('\n--- 新增的 imports ---');
    newImports.forEach(imp => console.log(`  ${imp}`));
    console.log('\n--- Schema JSX ---');
    console.log(schemaJsx);
    console.log('\n--- Breadcrumbs JSX ---');
    console.log(breadcrumbsJsx);
    return { success: true, reason: 'dry-run' };
  }

  // 寫入檔案
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  console.log('  ✅ 成功更新');

  return { success: true, reason: 'updated' };
}

// 主程式
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const testCount = args.includes('--test') ? 10 : 0;

  if (dryRun) {
    console.log('🔍 DRY RUN 模式 - 不會實際修改檔案\n');
  }

  // 取得所有工具頁面
  const enPagesDir = path.join(__dirname, '../src/app/(en)');
  const enDirs = fs.readdirSync(enPagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(enPagesDir, dirent.name, 'page.tsx'))
    .filter(p => fs.existsSync(p));

  let filesToProcess = enDirs;

  if (testCount > 0) {
    console.log(`🧪 測試模式 - 只處理前 ${testCount} 個頁面\n`);
    filesToProcess = enDirs.slice(0, testCount);
  }

  console.log(`📦 總共找到 ${enDirs.length} 個英文頁面`);
  console.log(`🎯 準備處理 ${filesToProcess.length} 個頁面\n`);

  const results = {
    updated: 0,
    skipped: 0,
    failed: 0,
  };

  filesToProcess.forEach(file => {
    const result = processFile(file, dryRun);
    if (result.success) {
      if (result.reason === 'updated') {
        results.updated++;
      }
    } else {
      if (result.reason === 'already-has-seo') {
        results.skipped++;
      } else {
        results.failed++;
      }
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log('📊 處理結果：');
  console.log(`  ✅ 成功更新: ${results.updated}`);
  console.log(`  ⏭️  跳過: ${results.skipped}`);
  console.log(`  ❌ 失敗: ${results.failed}`);
  console.log('='.repeat(50));
}

main();
