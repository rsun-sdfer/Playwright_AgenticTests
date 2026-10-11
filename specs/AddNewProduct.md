# CMS Admin Add New Product Test Plan

## Application Overview

Comprehensive live-UI-based test plan for adding products in Active eCommerce CMS. Tests use the authenticated Admin storage state restored into a fresh browser context; they do not repeat login. Product form route: https://cms.anhtester.com/admin/products/create, reached through Products > Add New Product. Required fields observed in the live form: Product Name, Category, Unit, Minimum purchase quantity, Unit price, Discount, Quantity, and Tax. The form includes Product Images (accepts image/* and multiple files), Product Videos (Youtube, Dailymotion, Vimeo), Product Variation, description, SEO, shipping configuration, and Save & Unpublish / Save & Publish actions. Reusable test data: add helper\product-data.json containing a valid baseline product fixture (name, category, unit, min_qty, unit_price, discount, discount_type, current_stock, tax, tax_type, and optional brand/SKU/barcode/description/image/video/SEO fields). Load this fixture for every test, clone it before modifying, and apply test-specific overrides; never mutate the shared baseline. Give created records unique names and identifiers per test run. Keep auth storage state secret/out of source control and clean up created products where supported. For boundaries not specified by the UI, first determine the accepted limits from field constraints or application validation, then test immediately below, at, and above each limit; do not assume unsupported limits.

## Test Scenarios

### 1. Admin Add New Product

**Seed:** `seed.spec.ts`

#### 1.1. Prepare and validate the reusable product data fixture

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Create helper\product-data.json as the shared valid baseline fixture for product tests. Include valid values for the live form's required fields: name, category_id, unit, min_qty, unit_price, discount, discount_type, current_stock, tax, and tax_type. Include optional representative values such as brand_id, sku, barcode, description, meta_title, and meta_description only if valid in the test environment.
    - expect: The fixture is valid JSON and contains a complete, valid baseline for all required form fields.
    - expect: Field names and data types correspond to the product form/API test conventions.
    - expect: The fixture uses non-production test data and does not contain credentials or authentication storage state.
  2. Load the baseline fixture in a test and make a test-local copy before applying a unique product name or scenario-specific values.
    - expect: Each test starts from the same baseline values without sharing mutable data.
    - expect: Per-test changes do not alter the fixture file or affect other tests.
    - expect: Created product identifiers are unique across parallel or repeated runs.

#### 1.2. Navigate to and inspect Add New Product form

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore the saved Admin authentication storage state into a fresh browser context; do not log in again. Open Products in the sidebar and select Add New Product.
    - expect: The browser opens https://cms.anhtester.com/admin/products/create.
    - expect: The form displays Product Information, Product Images, Product Videos, Product Variation, Product price + stock, Product Description, PDF Specification, SEO Meta Tags, and Shipping Configuration sections.
    - expect: The form offers Save & Unpublish and Save & Publish actions.

#### 1.3. Create and publish a valid product using the shared fixture

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore the saved Admin storage state into a fresh browser context. Load helper\product-data.json into a new test-local object, assign a unique product name/SKU, and navigate to Products > Add New Product.
    - expect: The form is displayed and test-local data is independent of the shared fixture.
  2. Populate the required fields from the fixture, choosing an available Category and using supported values for unit, minimum purchase quantity, unit price, discount, quantity, and tax.
    - expect: All required fields accept the fixture values and the form shows no validation errors.
  3. Click Save & Publish once and wait for completion.
    - expect: A success confirmation or product listing/detail view appears.
    - expect: The new product is identifiable by its unique name and is published/available as expected.

#### 1.4. Save a valid product as unpublished

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore saved Admin state into a fresh browser context, clone helper\product-data.json, generate a unique name, and navigate to Products > Add New Product.
    - expect: The product form is displayed.
  2. Fill required fields from the fixture and click Save & Unpublish.
    - expect: The product is saved successfully in an unpublished state.
    - expect: The saved product is identifiable and is not indicated as published.

#### 1.5. Validate each required product field independently

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. For each independent run, restore the saved Admin state into a fresh browser context, clone helper\product-data.json, and open Add New Product.
    - expect: The product form enforces required Product Name, Category, Unit, Minimum purchase quantity, Unit price, Discount, Quantity, and Tax.
  2. For each required field in turn, clear or unselect only that field while keeping the other fixture values valid, then submit using Save & Publish.
    - expect: The omitted field is identified by browser or application validation.
    - expect: Submission does not create a product and other entered values remain available for correction.

#### 1.6. Reject blank, whitespace-only, and invalid product names

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Start each attempt with a fresh context restored from Admin storage state and a new clone of helper\product-data.json. Set Product Name to empty, whitespace-only, and leading/trailing whitespace variants in separate attempts.
    - expect: Empty or whitespace-only names are rejected or normalized consistently; no invalid product is created.
    - expect: Leading/trailing whitespace behavior is consistent and the resulting name is not unexpectedly corrupted.
  2. Set the name to markup/script-like text and control characters in separate attempts, with all other fixture data valid, then submit.
    - expect: Unsafe input is safely rejected or encoded; it is not executed or rendered as active content.
    - expect: The application gives clear feedback and does not create an unsafe product.

#### 1.7. Test product name minimum and maximum length boundaries

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Determine the Product Name limits from the field's maxlength/validation or observed application rules. Use a fresh cloned fixture for each attempt and test values one character below, exactly at, and one character above each applicable minimum/maximum.
    - expect: Values within the accepted range are saved without truncation.
    - expect: Values outside the range are rejected with clear validation or handled consistently according to the defined rule.
    - expect: The resulting saved name matches the accepted input.

#### 1.8. Validate category selection and unavailable category behavior

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore Admin storage state into a fresh context, clone the fixture, and submit once with Category unselected.
    - expect: Category-required validation is displayed and no product is created.
  2. Select an available category from the UI and save with all other fixture values valid.
    - expect: The selected category is retained on the created product.
  3. If the environment supports it, start another fresh run when no selectable categories are available or use an unavailable/stale category value through a controlled test setup.
    - expect: The form clearly reports that a valid category is required or no categories are available.
    - expect: No product is silently assigned to a different category.

#### 1.9. Test unit, minimum purchase quantity, and stock boundaries

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. For each attempt, restore Admin state, clone the fixture, and change only the target field among Unit, Minimum purchase quantity, and Quantity. Test empty, whitespace for Unit, zero, negative, fractional, and very large values where applicable.
    - expect: Unit rejects blank/whitespace values if required.
    - expect: Quantity fields accept only values within their documented constraints and reject invalid negative, fractional, or excessive values where unsupported.
    - expect: Boundary behavior is clear and invalid values do not create a product.
  2. Use valid boundary values at the minimum supported quantity and stock, including zero stock if permitted, and save.
    - expect: Allowed boundary values are saved accurately.
    - expect: A product with zero stock follows configured out-of-stock behavior and is not reported as in stock incorrectly.

#### 1.10. Test unit price numeric boundaries and precision

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Using separate fresh contexts and cloned fixtures, test Unit price as empty, nonnumeric, negative, zero, the smallest positive amount, excessive decimal precision, and very large values. Determine field precision/range from the UI or application rules and test just below, at, and above each supported boundary.
    - expect: Invalid inputs are rejected or constrained with clear feedback.
    - expect: Valid boundary values are saved accurately without silent rounding or overflow.
    - expect: No invalid product is created.

#### 1.11. Test discount value and type boundaries

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Use separate fixture clones to test Discount with Flat and Percent types. Exercise zero, the maximum allowed discount, just below and above the maximum, negative values, and values exceeding the product price; determine whether a 100% discount is supported by application rules.
    - expect: Discount validation respects the selected type and configured constraints.
    - expect: Invalid/out-of-range values are clearly rejected and do not create a product.
    - expect: Valid boundary discounts calculate/display consistently without negative final prices or unexpected 100% behavior.

#### 1.12. Test tax value and type boundaries

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Using independent fixture clones, test Tax with Flat and Percent types, including zero, negative, decimal precision boundaries, and the configured maximum; test just below, at, and above each detected constraint.
    - expect: Valid tax values are accepted and associated with the selected tax type.
    - expect: Invalid values are rejected with clear feedback; no invalid product is created.

#### 1.13. Validate optional brand, colors, and product variations

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore Admin state, clone the shared fixture, and complete the required fields. Save once without optional Brand, Colors, or Choice Attributes and once with configured selections.
    - expect: Optional controls can be left unset without causing required validation.
    - expect: Available selections are retained correctly when provided.
  2. Where the form allows variation combinations, test no selection, one option, multiple options, and duplicate/invalid combinations using controlled test data.
    - expect: Valid combinations are represented correctly.
    - expect: Invalid or duplicate combinations are rejected or handled consistently without unintended variant records.

#### 1.14. Validate product image upload types, count, size, and empty files

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore Admin state and open the Product Images section. Confirm the input accepts image/* and multiple files.
    - expect: Supported image files can be selected and previews or upload indicators appear.
  2. Test one and multiple valid image files, then test an unsupported file type, zero-byte file, corrupt image, file just below/at/above any configured size limit, and more files than any configured count limit.
    - expect: Valid files within supported limits are accepted.
    - expect: Unsupported, corrupt, empty, oversized, or over-count uploads are rejected with clear feedback.
    - expect: Rejected files are not shown as successfully uploaded and the form remains usable.

#### 1.15. Validate optional video provider and video URL edge cases

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Using fixture clones, save once with both video fields empty, then test each provider (Youtube, Dailymotion, Vimeo) with a valid link.
    - expect: Video fields may be omitted if optional and valid provider/link pairs are accepted.
  2. Test malformed URLs, unsupported schemes, blank link with a selected provider, and a link with no selected provider.
    - expect: Invalid or inconsistent provider/link combinations are rejected or handled according to application rules with clear feedback.
    - expect: No unsafe content is rendered from the supplied URL.

#### 1.16. Validate description, SKU, barcode, and SEO text boundaries

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Use fixture clones to test optional Description, SKU, Barcode, Meta Title, and Meta Description with empty values, normal valid values, maximum-length boundaries, over-limit values, and markup/script-like text.
    - expect: Optional fields may remain empty where allowed.
    - expect: Text limits and unsafe text are handled safely and consistently without silent truncation or script execution.
    - expect: Valid values are retained in the saved product.

#### 1.17. Validate discount date range and shipping edge cases

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Use a cloned fixture to test discount date range with no dates, valid start/end dates, start equal to end, start after end, past dates, and malformed input where supported.
    - expect: Date relationships follow application rules and invalid ranges receive clear validation.
    - expect: No product is saved with an invalid active date range.
  2. Test optional shipping days/weight with empty, zero, negative, fractional, and very large values as applicable.
    - expect: Valid optional shipping values are retained.
    - expect: Invalid values receive clear feedback and do not produce inconsistent shipping data.

#### 1.18. Handle duplicate product names, SKU, and barcode

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Create or use a controlled existing test product, then restore Admin state into a fresh context, clone the fixture, and reuse its name, SKU, or barcode individually.
    - expect: Uniqueness rules are enforced where configured with a clear duplicate error.
    - expect: If duplicates are allowed, records remain distinguishable and no unrelated record is overwritten.

#### 1.19. Prevent duplicate creation on repeated save

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore Admin state into a fresh context, clone the fixture with unique identifiers, fill the required fields, and click a save action once.
    - expect: The interface indicates that the save is processing or complete.
  2. Attempt a second click only if the control remains enabled during processing; inspect the product list for duplicate records.
    - expect: Repeated submission is prevented or handled safely.
    - expect: At most one product record is created for the intended submission.

#### 1.20. Report save failures and preserve recoverable form data

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Restore Admin state into a fresh context, clone the fixture, fill the required fields, and use a controlled test-environment failure (validation/server/network failure) during save.
    - expect: A clear error is shown and no success confirmation is displayed.
    - expect: The form preserves entered values where the application supports recovery.
    - expect: No duplicate or partially successful product is reported as created.

#### 1.21. Verify fixture reuse across isolated tests and parallel execution

**File:** `specs\add-new-product.spec.ts`

**Steps:**
  1. Run two independent product tests in separate browser contexts, each restoring the saved Admin storage state and cloning helper\product-data.json. Apply different unique names and one test-specific override to each clone.
    - expect: Both tests start from the same baseline fixture values and do not interfere with one another.
    - expect: The fixture remains unchanged after both runs.
    - expect: Each successfully created product contains only its own test data and can be identified for cleanup.
