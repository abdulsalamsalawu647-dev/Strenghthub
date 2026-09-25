/* =========================================================
   COMMUNITY — COMING SOON
========================================================= */

function communityComingSoon(feature) {

    alert(
        feature +
        " is coming soon to StrengthHub.\n\n" +
        "We're working on building this feature."
    );

}


/* =========================================================
   ADMIN NAVIGATION
========================================================= */

async function checkAdminAccess() {

    const adminNavLink =
        document.getElementById("adminNavLink");

    // If this page doesn't have the Admin link,
    // do nothing.
    if (!adminNavLink) {
        return;
    }

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    // Not logged in
    if (!user) {
        return;
    }

    const {
        data: adminUser,
        error
    } = await supabaseClient
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Admin check error:", error);
        return;
    }

    // Show Admin only to an admin
    if (adminUser) {
        adminNavLink.style.display = "inline-block";
    }
}


/* =========================================================
   START ADMIN CHECK
========================================================= */

checkAdminAccess();