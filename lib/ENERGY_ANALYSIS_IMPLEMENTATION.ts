// IMPLEMENTATION SUMMARY: Optimized Energy Analysis System
// ==============================================================

/**
 * OVERVIEW
 * --------
 * Created comprehensive energy analysis system with:
 * - Exactly 11 allowed stones (no Tiger Eye, no duplicates)
 * - 6 emotional state groups with detailed mappings
 * - Color filtering system (Vietnamese color names)
 * - Conflict prevention (hot/cold, color clashes)
 * - Complete stone selection logic (main, healing, boost, theme roles)
 * - Personalized recommendations with affirmations
 */

// ============================================================
// FILE 1: zodiac-data.ts (UPDATED)
// ============================================================
/**
 * Changes made:
 * - Kept all 12 zodiac signs with Vietnamese names
 * - Kept element system (Hỏa, Thổ, Khí, Nước)
 * - Kept ELEMENT_DISPLAY mapping for Vietnamese display
 * - UPDATED ALLOWED_STONES: 12 → 11 stones
 *   Removed: Tiger Eye (id: tiger-eye)
 *   Kept: Citrine, Clear Quartz, Amethyst, Fluorite, Moonstone,
 *         Sunstone, Labradorite, Peridot, Aquamarine, Rose Quartz, Garnet
 * - Updated comment to reflect "11 loại đá duy nhất"
 * - Updated Labradorite name to include "(Đá Hắc Nguyệt Quang)"
 * - Kept all affirmations unchanged (10 states + default)
 * - Kept all exports (getZodiacByDate, getElementDisplay, etc.)
 */

// ============================================================
// FILE 2: analyzeEnergy.ts (NEW - 556 lines)
// ============================================================
/**
 * Complete energy analysis engine with:
 * 
 * TYPES:
 * ------
 * - UserAnswers: All form data (birthDate, emotionalState, lifeGoal, etc.)
 * - Stone: Stone metadata interface
 * - SelectedStone: Stone with role, colors, meaning, reasoning
 * - VongTayDeXuat: Final bracelet recommendation (colors, beads, stones)
 * - ReadingCard: Energy reading with affirmation & description
 * 
 * MAPPINGS:
 * ---------
 * 1. COLOR_FILTER_MAP (lines 59-80):
 *    Vietnamese color names → Stone IDs to avoid
 *    Examples:
 *    - "vàng": ["citrine"] → Remove yellow stones if user forbids
 *    - "nóng": ["citrine", "sunstone", "garnet"] → Remove all warm stones
 *    - "xanh": [...all blue/cyan stones] → Remove blues
 * 
 * 2. EMOTIONAL_STATE_MAP (lines 82-246):
 *    Maps 6 emotional states (+ aliases) to optimal stone selection:
 *    
 *    State 1: STRESS (stress, can-thang)
 *    ├─ Healing: Amethyst, Aquamarine (Thủy → calm)
 *    ├─ Main: Clear Quartz (neutral amplifier)
 *    ├─ Boost: Fluorite (focus)
 *    ├─ Theme: Moonstone (gentle)
 *    └─ Reasons: [5 detailed explanations]
 *    
 *    State 2: LOST (lost, mong-lung)
 *    ├─ Healing: Labradorite, Fluorite (Khí → clarity)
 *    ├─ Main: Clear Quartz
 *    ├─ Boost: Peridot (rebirth)
 *    ├─ Theme: Labradorite (transformation)
 *    └─ Reasons: [4 detailed explanations]
 *    
 *    State 3: ANXIOUS (anxious, bat-an)
 *    ├─ Healing: Amethyst, Moonstone (Nước → emotional balance)
 *    ├─ Main: Rose Quartz (self-love)
 *    ├─ Boost: Aquamarine (clarity)
 *    ├─ Theme: Moonstone (feminine)
 *    └─ Reasons: [4 detailed explanations]
 *    
 *    State 4: ANGRY (angry, nong-nay)
 *    ├─ Healing: Aquamarine, Rose Quartz (Thủy → cooling)
 *    ├─ Main: Clear Quartz
 *    ├─ Boost: Amethyst (peace)
 *    ├─ Theme: Aquamarine (calm)
 *    └─ Note: AVOID hot stones completely (Citrine, Sunstone, Garnet)
 *    
 *    State 5: BORED (bored, te-nhat)
 *    ├─ Healing: Clear Quartz
 *    ├─ Main: Citrine (Hỏa → energy boost)
 *    ├─ Boost: Sunstone (vitality)
 *    ├─ Theme: Garnet (passion) OR Sunstone
 *    └─ Purpose: Energize, motivate, awaken
 *    
 *    State 6: HAPPY (happy, vui-ve)
 *    ├─ Healing: Rose Quartz, Moonstone (nurturing)
 *    ├─ Main: Citrine (maintain positivity)
 *    ├─ Boost: Sunstone (amplify joy)
 *    ├─ Theme: Rose Quartz (love)
 *    └─ Purpose: Amplify & sustain happiness
 *    
 *    DEFAULT: Any unmatched state
 *    ├─ Main: Clear Quartz, Healing: Amethyst, Boost: Rose Quartz
 *    └─ Safe, balanced choice
 * 
 * FUNCTIONS:
 * ----------
 * 1. filterStonesByColor(forbiddenColors?: string): Stone[]
 *    - Parses comma-separated Vietnamese color names
 *    - Uses COLOR_FILTER_MAP to identify forbidden stone IDs
 *    - Returns filtered ALLOWED_STONES array
 *    - Handles "any" or empty → returns all stones
 * 
 * 2. getEmotionalStateKey(emotionalStates?: string[]): string
 *    - Converts user's emotional state to mapping key
 *    - Handles both English & Vietnamese names
 *    - Examples:
 *      "căng thẳng" → "can-thang"
 *      "mông lung" → "mong-lung"
 *      "stress" → "can-thang"
 *      "lost" → "mong-lung"
 * 
 * 3. hasEnergyConflict(stoneIds: string[]): boolean
 *    - Detects hot (Hỏa) vs cold (Thủy) stone conflicts
 *    - Hot stones: citrine, sunstone, garnet
 *    - Cold stones: rose-quartz, moonstone, aquamarine, amethyst
 *    - Allows balanced mix (1 hot + 1 cold)
 *    - Prevents excessive imbalance
 * 
 * 4. analyzeEnergy(user: UserAnswers): {
 *      vongTayDeXuat: VongTayDeXuat,
 *      readingCard: ReadingCard,
 *      zodiacInfo: { name, element, birthstone }
 *    }
 *    - MAIN function combining all logic
 *    - Steps:
 *      a) Parse birthDate → get zodiac & element display
 *      b) Filter available stones by mauKhongMuon
 *      c) Get emotional state mapping
 *      d) Select stones by role:
 *         - Main: emotionalState → adjusted by lifeGoal
 *         - Healing: emotionalState → adjusted by gender
 *         - Boost: emotional support stone
 *         - Theme: fashion style stone
 *      e) Check conflicts & adjust if needed
 *      f) Calculate bracelet specs (beads, size)
 *      g) Build bangDa array with colors, meanings, reasons
 *      h) Generate affirmation & energy description
 * 
 * 5. buildEnergyDescription(...): string
 *    - Personalizes energy description based on:
 *      - Emotional state (can-thang, mong-lung, etc.)
 *      - Selected stones (top 3 names)
 *      - Element display (Mệnh Tương Sinh description)
 *    - Returns 1-2 sentence summary in Vietnamese
 */

// ============================================================
// STONE SELECTION LOGIC
// ============================================================
/**
 * STEP 1: COLOR FILTERING (mauKhongMuon)
 * -------
 * Input: User form with mauKhongMuon = "vàng, cam, nóng"
 * Process:
 *   - Parse: ["vàng", "cam", "nóng"]
 *   - Look up in COLOR_FILTER_MAP
 *   - Combine: ["citrine", "sunstone", "garnet"]
 *   - Filter: Remove these from ALLOWED_STONES
 * Output: availableStones = [Clear Quartz, Amethyst, Fluorite, ..., Rose Quartz]
 *         (9 stones, Citrine & Sunstone & Garnet removed)
 * 
 * STEP 2: MAIN STONE (trangThaiTinhThan → emotionalStateKey)
 * -------
 * Input: trangThaiTinhThan = ["Căng thẳng", "Kiệt sức"]
 * Process:
 *   - getEmotionalStateKey() → "can-thang"
 *   - EMOTIONAL_STATE_MAP["can-thang"].main → "clear-quartz"
 *   - Lookup in availableStones → find "clear-quartz"
 * Adjustment by lifeGoal:
 *   - If lifeGoal includes "tài lộc" → Change to "citrine" (if available)
 *   - If lifeGoal includes "tình yêu" → Change to "rose-quartz"
 *   - If lifeGoal includes "sức khỏe" → Keep "clear-quartz"
 * Output: mainStone = Clear Quartz (or adjusted)
 * 
 * STEP 3: HEALING STONES (1-2 stones)
 * -------
 * Input: EMOTIONAL_STATE_MAP["can-thang"].healing = ["amethyst", "aquamarine"]
 * Process:
 *   - Check each in availableStones
 *   - Add to selectedStones if found
 *   - Max 2 healing stones
 * Adjustment by gender:
 *   - If gioiTinh = "nữ" AND NOT already has moonstone
 *     → Add Moonstone to healing stones
 * Output: 1-2 healing stones added to selectedStones
 * 
 * STEP 4: BOOST STONE (1 stone, support role)
 * -------
 * Input: EMOTIONAL_STATE_MAP["can-thang"].boost = "fluorite"
 * Process:
 *   - Find "fluorite" in availableStones
 *   - Add if not duplicate of main stone
 * Output: boostStone added to selectedStones
 * 
 * STEP 5: THEME STONE (0-1 stone, fashion style)
 * -------
 * Input: phongCach = "thanh lịch"
 * Process:
 *   - If includes "thanh" or "elegant" → prefer Labradorite
 *   - If includes "sôi" or "vibrant" → prefer Sunstone
 *   - If includes "tối giản" or "minimalist" → prefer Clear Quartz
 *   - If includes "lãng mạn" or "romantic" → prefer Rose Quartz
 *   - Fallback to EMOTIONAL_STATE_MAP[stateKey].theme
 * Output: 0-1 theme stone added (avoid duplicates)
 * 
 * STEP 6: CONFLICT CHECK & ADJUSTMENT
 * -------
 * Check:
 *   - hasEnergyConflict(selectedStoneIds)
 *   - If >4 stones AND has hot/cold mix → remove least important
 * Avoid:
 *   - Never select both Citrine + Aquamarine + Amethyst (too mixed)
 *   - Never exceed 6 stones in bracelet
 * Output: selectedStones finalized (3-6 stones)
 * 
 * STEP 7: RESULT BUILDING
 * -------
 * bangDa: Array of {vaiTro, tenDa, mauSac, yNghia, lyDo}
 *         - vaiTro: "main" | "healing" | "boost" | "theme"
 *         - tenDa: "Thạch Anh Vàng (Citrine)"
 *         - mauSac: "#FFD700" (hex color)
 *         - yNghia: "Thu hút tài lộc, ..."
 *         - lyDo: "Amethyst được chọn vì bạn đang căng thẳng, ..."
 * mauChuDao: Unique colors from all stones ["#9966CC", "#7FFFD4", "#FFFFFF"]
 * lyDoChon: Array of reasons for each stone [5-6 reasons]
 * affirmation: getRandomAffirmation("can-thang") OR user.affirmation
 * energyDescription: "Năng lượng của bạn đang cần thanh lọc..."
 */

// ============================================================
// EXAMPLE USAGE & SCENARIOS
// ============================================================
/**
 * SCENARIO 1: STRESS + FORBIDDEN WARM COLORS + FEMALE
 * ---------------------------------------------------
 * User answers:
 *   - birthDate: "1998-05-15" → Kim Ngưu
 *   - gioiTinh: "nữ"
 *   - trangThaiTinhThan: ["Căng thẳng"]
 *   - suMenh: ["bình yên", "tình yêu"]
 *   - vibeNangLuong: "nhẹ nhàng"
 *   - phongCach: "thanh lịch"
 *   - mauKhongMuon: "vàng, cam, nóng"
 *   - coTayCm: 16.5
 *   - nganSach: 800000
 * 
 * Processing:
 * 1. Filter by color: Remove [citrine, sunstone, garnet]
 *    availableStones: 8 stones remain
 * 2. Emotional state: "can-thang" → healing[amethyst, aquamarine], main[clear-quartz]
 * 3. Main stone: Clear Quartz (trung tính, không bị cấm)
 * 4. Adjust by lifeGoal "tình yêu": Change main to Rose Quartz (not forbidden!)
 * 5. Healing: Amethyst + Aquamarine (both available)
 * 6. Gender adjustment: Add Moonstone (nữ)
 * 7. Boost: Fluorite
 * 8. Theme: Labradorite (for "thanh lịch")
 * 
 * Result:
 *   - bangDa: [Rose Quartz (main), Amethyst (healing), Aquamarine (healing),
 *             Moonstone (healing), Fluorite (boost), Labradorite (theme)]
 *   - mauChuDao: ["#FFB6C1", "#9966CC", "#7FFFD4", "#F0E68C", "#8B7DBC", "#A8DADC"]
 *   - lyDoChon: [6 detailed reasons]
 *   - affirmation: "Tôi buông bỏ căng thẳng và đón nhận bình yên nội tâm."
 *   - energyDescription: "Năng lượng của bạn đang cần thanh lọc... Rose Quartz, Amethyst,
 *                        Aquamarine sẽ mang lại sự tĩnh lặng... Mệnh Tương Sinh: Nước..."
 * 
 * SCENARIO 2: BORED + NO FORBIDDEN COLORS + MALE + WEALTH GOAL
 * -----------------------------------------------------------
 * User answers:
 *   - birthDate: "2000-08-10" → Sư Tử
 *   - gioiTinh: "nam"
 *   - trangThaiTinhThan: ["Tẻ nhạt", "Thiếu động lực"]
 *   - suMenh: ["thành công", "tài lộc"]
 *   - vibeNangLuong: "mạnh mẽ"
 *   - phongCach: "sôi động"
 *   - mauKhongMuon: "" (empty → all colors ok)
 *   - coTayCm: 17
 *   - nganSach: 1200000
 * 
 * Processing:
 * 1. Filter by color: No restriction, all 11 stones available
 * 2. Emotional state: "te-nhat" → healing[clear-quartz], main[citrine], boost[sunstone]
 * 3. Main stone: Citrine (wealth goal matches perfectly)
 * 4. Healing: Clear Quartz (neutral amplifier)
 * 5. Boost: Sunstone (joy, vitality)
 * 6. Theme: Garnet (strong, passionate for "sôi động")
 * 7. No gender adjustment (male)
 * 
 * Result:
 *   - bangDa: [Citrine (main), Clear Quartz (healing), Sunstone (boost), Garnet (theme)]
 *   - mauChuDao: ["#FFD700", "#FFFFFF", "#FF8C00", "#C71585"]
 *   - lyDoChon: [4 detailed reasons]
 *   - affirmation: "Tôi lan tỏa sự vui vẻ và năng lượng tích cực."
 *   - energyDescription: "Năng lượng của bạn cần được khơi dậy... Citrine, Sunstone, Garnet
 *                        sẽ tăng cường sức sống và năng lượng Hỏa..."
 * 
 * SCENARIO 3: ANXIOUS + FORBIDDEN PURPLE + FEMALE + HEALTH GOAL
 * -------------------------------------------------------------
 * User answers:
 *   - birthDate: "1995-12-25" → Ma Kết
 *   - gioiTinh: "nữ"
 *   - trangThaiTinhThan: ["Bất an", "Khó ngủ"]
 *   - suMenh: ["sức khỏe", "an toàn"]
 *   - vibeNangLuong: "nhẹ nhàng"
 *   - phongCach: "lãng mạn"
 *   - mauKhongMuon: "tím"
 *   - coTayCm: 16
 *   - nganSach: 700000
 * 
 * Processing:
 * 1. Filter by color: Remove [amethyst] (tím)
 *    availableStones: 10 stones remain
 * 2. Emotional state: "bat-an" → healing[amethyst, moonstone], main[rose-quartz]
 * 3. Main: Rose Quartz (perfect for "tình yêu" + health goal)
 * 4. Healing: Amethyst not available! Fallback to Moonstone only
 * 5. Add Aquamarine (next healing option in bat-an)
 * 6. Boost: Aquamarine (already in healing, avoid duplicate) → try next → Clear Quartz
 * 7. Theme: Rose Quartz (already main) → fallback to Moonstone for "lãng mạn"
 * 
 * Result:
 *   - bangDa: [Rose Quartz (main), Moonstone (healing), Aquamarine (healing),
 *             Clear Quartz (boost)]
 *   - mauChuDao: ["#FFB6C1", "#F0E68C", "#7FFFD4", "#FFFFFF"]
 *   - lyDoChon: [4 reasons]
 *   - affirmation: "Tôi an toàn, được bảo vệ và yên bình."
 *   - energyDescription: "Năng lượng của bạn cần được nuôi dưỡng... Rose Quartz, Moonstone,
 *                        Aquamarine sẽ giúp bạn cảm thấy yên bình..."
 * 
 * SCENARIO 4: HAPPY + NO RESTRICTIONS + NEUTRAL GENDER
 * ---------------------------------------------------
 * User answers:
 *   - birthDate: "2002-11-15" → Nhân Mã
 *   - gioiTinh: "khác"
 *   - trangThaiTinhThan: ["Vui vẻ", "Bình yên"]
 *   - suMenh: ["duy trì", "tình yêu"]
 *   - vibeNangLuong: "tích cực"
 *   - phongCach: "tối giản"
 *   - mauKhongMuon: "any"
 *   - coTayCm: 15.5
 *   - nganSach: 900000
 * 
 * Processing:
 * 1. Filter: All stones available
 * 2. Emotional state: "vui-ve" → healing[rose-quartz, moonstone], main[citrine]
 * 3. Main: Citrine (maintain positivity)
 * 4. Healing: Rose Quartz + Moonstone (both available)
 * 5. Boost: Sunstone (amplify joy)
 * 6. Theme: Clear Quartz (for "tối giản" style)
 * 7. No gender adjustment (neutral)
 * 
 * Result:
 *   - bangDa: [Citrine (main), Rose Quartz (healing), Moonstone (healing),
 *             Sunstone (boost), Clear Quartz (theme)]
 *   - mauChuDao: ["#FFD700", "#FFB6C1", "#F0E68C", "#FF8C00", "#FFFFFF"]
 *   - lyDoChon: [5 reasons]
 *   - affirmation: "Tôi biết ơn và lan tỏa hạnh phúc mỗi ngày."
 *   - energyDescription: "Năng lượng của bạn đang rất tích cực... Citrine, Sunstone sẽ
 *                        duy trì và khuếch đại hạnh phúc..."
 */

// ============================================================
// EDGE CASES & HANDLING
// ============================================================
/**
 * CASE 1: Color filter removes too many stones
 * Scenario: mauKhongMuon = "vàng, cam, xanh, tím" (removes 7 stones)
 * Available: [Clear Quartz, Moonstone, Rose Quartz, Garnet] = 4 stones
 * 
 * Handling:
 * - Still use available stones
 * - Recommendations may have fewer options
 * - Always fallback to Clear Quartz + Rose Quartz (safe)
 * - Display warning: "Tôi tìm đá phù hợp với giới hạn màu của bạn..."
 * 
 * CASE 2: Emotional state not in mapping
 * Scenario: trangThaiTinhThan = ["Phấn khích quá mức"]
 * 
 * Handling:
 * - getEmotionalStateKey() returns "default"
 * - Use DEFAULT mapping: Clear Quartz, Amethyst, Rose Quartz, Moonstone
 * - Safe, balanced choice
 * - Affirmation from "default" group
 * 
 * CASE 3: Hot/cold conflict detected
 * Scenario: stoneIds = ["citrine", "amethyst", "aquamarine", "rose-quartz", "sunstone"]
 * 
 * Handling:
 * - hasEnergyConflict() returns true (has citrine + aquamarine)
 * - length > 4 → remove last stone (sunstone)
 * - Result: [citrine, amethyst, aquamarine, rose-quartz]
 * - Balanced 1 hot (citrine) + 3 cold
 * 
 * CASE 4: Main stone removed by color filter
 * Scenario: main = "citrine", but "vàng" is forbidden
 * 
 * Handling:
 * - Main stone = undefined after lookup
 * - Try to adjust by lifeGoal
 * - If still no match, use first available stone from list
 * - Fallback to Clear Quartz always available
 * 
 * CASE 5: Gender adjustment conflicts with color filter
 * Scenario: gioiTinh = "nữ", mauKhongMuon = "hồng" (removes rose-quartz)
 * But healing wants moonstone (available)
 * 
 * Handling:
 * - Still add moonstone (nữ adjustment)
 * - Don't force rose-quartz if forbidden
 * - Show in lyDoChon why moonstone chosen instead
 */

// ============================================================
// INTEGRATION WITH FORM
// ============================================================
/**
 * Form fields → UserAnswers mapping:
 * 
 * Form Question 1: "Ngày sinh của bạn?" (Date picker)
 * → UserAnswers.birthDate: "YYYY-MM-DD"
 * 
 * Form Question 2: "Giới tính?" (Radio)
 * → UserAnswers.gioiTinh: "nữ" | "nam" | "khác"
 * 
 * Form Question 3: "Tâm trạng hiện tại?" (Multi-select)
 * → UserAnswers.trangThaiTinhThan: ["Căng thẳng", "Kiệt sức"]
 * → Converted to stateKey in analyzeEnergy()
 * 
 * Form Question 4: "Rào cản chính?" (Select)
 * → UserAnswers.raoCan: "overthinking" | "fear" | ...
 * 
 * Form Question 5: "Sứ mệnh sống?" (Multi-select)
 * → UserAnswers.suMenh: ["bình yên", "tình yêu", "thành công"]
 * → Used to adjust main stone selection
 * 
 * Form Question 6: "Vibe năng lượng?" (Select)
 * → UserAnswers.vibeNangLuong: "mạnh mẽ" | "nhẹ nhàng" | "bình tĩnh"
 * → Displayed in result + used for boost stone
 * 
 * Form Question 7: "Phong cách thời trang?" (Select)
 * → UserAnswers.phongCach: "thanh lịch" | "sôi động" | "tối giản"
 * → Used to select theme stone
 * 
 * Form Question 8: "Màu cấm?" (Text input)
 * → UserAnswers.mauKhongMuon: "vàng, cam, nóng"
 * → First step in stone filtering
 * 
 * Form Question 9: "Cỡ tay?" (Number input)
 * → UserAnswers.coTayCm: 16.5
 * → Used to calculate estimated beads
 * 
 * Form Question 10: "Ngân sách?" (Number input)
 * → UserAnswers.nganSach: 800000
 * → Displayed in vongTayDeXuat
 * 
 * Form Question 11: "Affirmation tùy chỉnh?" (Text input, optional)
 * → UserAnswers.affirmation: "Tôi yêu bản thân toàn phần"
 * → If provided, use instead of random affirmation
 */

export const IMPLEMENTATION_COMPLETE = true
