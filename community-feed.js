// ==========================================
// STRENGTHHUB COMMUNITY FEED
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const postContent =
    document.getElementById("postContent");

const postType =
    document.getElementById("postType");

const createPostButton =
    document.getElementById("createPostButton");

const postCharacterCount =
    document.getElementById("postCharacterCount");

const postMessage =
    document.getElementById("postMessage");

const communityPosts =
    document.getElementById("communityPosts");

const feedLoading =
    document.getElementById("feedLoading");

const feedEmpty =
    document.getElementById("feedEmpty");

const loginRequired =
    document.getElementById("loginRequired");

const createPostSection =
    document.getElementById("createPostSection");

const refreshFeedButton =
    document.getElementById("refreshFeedButton");


// ==========================================
// CURRENT USER
// ==========================================

let currentUser = null;


// ==========================================
// GET CURRENT USER
// ==========================================

async function loadCurrentUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {

        console.error(
            "Authentication error:",
            error
        );

        showLoggedOutState();

        return;

    }


    if (!user) {

        showLoggedOutState();

        return;

    }


    currentUser = user;

    showLoggedInState();

}


// ==========================================
// LOGGED-IN STATE
// ==========================================

function showLoggedInState() {

    if (createPostSection) {

        createPostSection.style.display =
            "block";

    }


    if (loginRequired) {

        loginRequired.style.display =
            "none";

    }

}


// ==========================================
// LOGGED-OUT STATE
// ==========================================

function showLoggedOutState() {

    currentUser = null;


    if (createPostSection) {

        createPostSection.style.display =
            "none";

    }


    if (loginRequired) {

        loginRequired.style.display =
            "block";

    }

}


// ==========================================
// CHARACTER COUNTER
// ==========================================

if (postContent) {

    postContent.addEventListener(
        "input",
        function () {

            const length =
                postContent.value.length;


            if (postCharacterCount) {

                postCharacterCount.textContent =
                    length + " / 1000";

            }

        }
    );

}


// ==========================================
// CREATE COMMUNITY POST
// ==========================================

async function createCommunityPost() {

    if (!currentUser) {

        showMessage(
            "You must be logged in to create a post.",
            "error"
        );

        return;

    }


    const content =
        postContent.value.trim();


    const selectedPostType =
        postType
            ? postType.value
            : "Training Update";


    if (!content) {

        showMessage(
            "Please write something before posting.",
            "error"
        );

        return;

    }


    if (content.length > 1000) {

        showMessage(
            "Your post cannot exceed 1000 characters.",
            "error"
        );

        return;

    }


    createPostButton.disabled =
        true;

    createPostButton.textContent =
        "POSTING...";


    // ======================================
    // INSERT POST
    // ======================================

    const {
        error
    } = await supabaseClient

        .from("community_posts")

        .insert({

            user_id:
                currentUser.id,

            content:
                content,

            post_type:
                selectedPostType

        });


    if (error) {

        console.error(
            "Create post error:",
            error
        );


        alert(
            "ERROR: " +
            error.message
        );


        createPostButton.disabled =
            false;

        createPostButton.textContent =
            "POST";

        return;

    }


    // ======================================
    // RESET FORM
    // ======================================

    postContent.value = "";


    if (postCharacterCount) {

        postCharacterCount.textContent =
            "0 / 1000";

    }


    if (postType) {

        postType.value =
            "Training Update";

    }


    showMessage(
        "Your post has been published.",
        "success"
    );


    createPostButton.disabled =
        false;

    createPostButton.textContent =
        "POST";


    await loadCommunityPosts();

}


// ==========================================
// LOAD COMMUNITY POSTS
// ==========================================

async function loadCommunityPosts() {

    if (!communityPosts) {

        return;

    }


    if (feedLoading) {

        feedLoading.style.display =
            "block";

    }


    if (feedEmpty) {

        feedEmpty.style.display =
            "none";

    }


    communityPosts.innerHTML =
        "";


    // ======================================
    // LOAD POSTS
    // ======================================

    const {
        data: posts,
        error: postError
    } = await supabaseClient

        .from("community_posts")

        .select(`
            id,
            user_id,
            content,
            post_type,
            created_at,
            profiles (
                username,
                full_name,
                profile_image
            )
        `)

        .order(
            "created_at",
            {
                ascending: false
            }
        );


    if (postError) {

        console.error(
            "Load posts error:",
            postError
        );


        if (feedLoading) {

            feedLoading.style.display =
                "none";

        }

        return;

    }


    if (
        !posts ||
        posts.length === 0
    ) {

        if (feedLoading) {

            feedLoading.style.display =
                "none";

        }


        if (feedEmpty) {

            feedEmpty.style.display =
                "block";

        }

        return;

    }


    // ======================================
    // LOAD LIKES
    // ======================================

    let likes = [];


    const {
        data: likeData,
        error: likeError
    } = await supabaseClient

        .from("community_post_likes")

        .select(
            "id, post_id, user_id"
        );


    if (likeError) {

        console.error(
            "Load likes error:",
            likeError
        );

    } else {

        likes =
            likeData || [];

    }


    // ======================================
    // LOAD COMMENTS
    // ======================================

    let comments = [];


    const {
        data: commentData,
        error: commentError
    } = await supabaseClient

        .from("community_comments")

        .select(`
            id,
            post_id,
            user_id,
            content,
            created_at
        `)

        .order(
            "created_at",
            {
                ascending: true
            }
        );


    if (commentError) {

        console.error(
            "Load comments error:",
            commentError
        );

    } else {

        comments =
            commentData || [];

    }


    // ======================================
    // LOAD COMMENT PROFILES
    // ======================================

    if (comments.length > 0) {

        const commentUserIds =
            [
                ...new Set(
                    comments.map(
                        function (comment) {

                            return comment.user_id;

                        }
                    )
                )
            ];


        if (commentUserIds.length > 0) {

            const {
                data: commentProfiles,
                error: profileError
            } = await supabaseClient

                .from("profiles")

                .select(`
                    id,
                    username,
                    full_name,
                    profile_image
                `)

                .in(
                    "id",
                    commentUserIds
                );


            if (profileError) {

                console.error(
                    "Load comment profiles error:",
                    profileError
                );

            } else {

                comments =
                    comments.map(
                        function (comment) {

                            const profile =
                                (commentProfiles || [])
                                    .find(
                                        function (profile) {

                                            return profile.id ===
                                                comment.user_id;

                                        }
                                    );


                            return {

                                ...comment,

                                profiles:
                                    profile || null

                            };

                        }
                    );

            }

        }

    }


    // ======================================
    // STOP LOADING
    // ======================================

    if (feedLoading) {

        feedLoading.style.display =
            "none";

    }


    // ======================================
    // DISPLAY POSTS
    // ======================================

    posts.forEach(
        function (post) {

            const postElement =
                createPostElement(
                    post,
                    likes,
                    comments
                );


            communityPosts.appendChild(
                postElement
            );

        }
    );

}


// ==========================================
// CREATE POST ELEMENT
// ==========================================

function createPostElement(
    post,
    likes,
    comments
) {

    const article =
        document.createElement("article");


    article.className =
        "community-post-card";


    const profile =
        post.profiles || {};


    const username =
        profile.username ||
        "Athlete";


    const fullName =
        profile.full_name ||
        "";


    const profileImage =
        profile.profile_image ||
        "";


    const displayName =
        fullName ||
        username;


    // ======================================
    // PROFILE LINK
    // ======================================

    const profileLink =
        "profile.html?id=" +
        encodeURIComponent(
            post.user_id
        );


    // ======================================
    // AVATAR
    // ======================================

    let avatarHTML = "";


    if (profileImage) {

        avatarHTML = `

            <a
                href="${profileLink}"
                class="community-post-profile-link"
                aria-label="View ${escapeCommunityFeedText(username)}'s profile"
            >

                <img
                    src="${escapeCommunityFeedText(profileImage)}"
                    alt="${escapeCommunityFeedText(username)}"
                    class="community-post-avatar"
                >

            </a>

        `;

    } else {

        avatarHTML = `

            <a
                href="${profileLink}"
                class="community-post-profile-link"
                aria-label="View ${escapeCommunityFeedText(username)}'s profile"
            >

                <div class="community-post-avatar-placeholder">

                    ${escapeCommunityFeedText(
                        username
                            .charAt(0)
                            .toUpperCase()
                    )}

                </div>

            </a>

        `;

    }


    // ======================================
    // DELETE POST
    // ======================================

    let deleteButtonHTML = "";


    if (
        currentUser &&
        currentUser.id === post.user_id
    ) {

        deleteButtonHTML = `

            <button
                type="button"
                class="community-post-delete"
                data-post-id="${post.id}"
            >
                Delete
            </button>

        `;

    }


    // ======================================
    // POST TYPE
    // ======================================

    const displayPostType =
        post.post_type ||
        "Training Update";


    // ======================================
    // LIKES
    // ======================================

    const postLikes =
        likes.filter(
            function (like) {

                return String(like.post_id) ===
                    String(post.id);

            }
        );


    const likeCount =
        postLikes.length;


    const userLiked =
        currentUser &&
        postLikes.some(
            function (like) {

                return like.user_id ===
                    currentUser.id;

            }
        );


    // ======================================
    // COMMENTS
    // ======================================

    const postComments =
        comments.filter(
            function (comment) {

                return String(comment.post_id) ===
                    String(post.id);

            }
        );


    const commentCount =
        postComments.length;


    // ======================================
    // POST HTML
    // ======================================

    article.innerHTML = `

        <div class="community-post-header">

            <div class="community-post-user">

                ${avatarHTML}


                <div class="community-post-user-info">

                    <a
                        href="${profileLink}"
                        class="community-post-profile-name"
                    >

                        <strong>
                            ${escapeCommunityFeedText(
                                displayName
                            )}
                        </strong>

                    </a>


                    <a
                        href="${profileLink}"
                        class="community-post-profile-username"
                    >

                        @${escapeCommunityFeedText(
                            username
                        )}

                    </a>

                </div>

            </div>


            <div class="community-post-meta">

                <time>
                    ${formatCommunityDate(
                        post.created_at
                    )}
                </time>

                ${deleteButtonHTML}

            </div>

        </div>


        <!-- POST TYPE -->

        <div class="community-post-type-badge">

            ${escapeCommunityFeedText(
                displayPostType
            )}

        </div>


        <!-- POST CONTENT -->

        <div class="community-post-content">

            ${escapeCommunityFeedText(
                post.content
            ).replace(
                /\n/g,
                "<br>"
            )}

        </div>


        <!-- POST ACTIONS -->

        <div class="community-post-actions">

            <button
                type="button"
                class="community-like-button ${
                    userLiked ? "liked" : ""
                }"
                data-post-id="${post.id}"
                aria-label="Like post"
            >

                <span class="community-like-icon">

                    ${userLiked ? "♥" : "♡"}

                </span>

                <span class="community-like-count">
                    ${likeCount}
                </span>

            </button>


            <button
                type="button"
                class="community-comment-button"
                data-post-id="${post.id}"
                aria-label="Comments"
            >

                <span class="community-comment-icon">
                    ♡
                </span>

                <span class="community-comment-count">
                    ${commentCount}
                </span>

            </button>

        </div>


        <!-- COMMENTS -->

        <div
            class="community-comments"
            id="comments-${post.id}"
            style="display: none;"
        >

            <div class="community-comments-list">

                ${createCommentsHTML(
                    postComments
                )}

            </div>


            ${
                currentUser
                    ? `

                    <div class="community-comment-form">

                        <input
                            type="text"
                            class="community-comment-input"
                            placeholder="Write a comment..."
                            maxlength="500"
                            autocomplete="off"
                        >

                        <button
                            type="button"
                            class="community-comment-submit"
                        >
                            COMMENT
                        </button>

                    </div>

                    `
                    : `

                    <p class="community-comment-login">
                        Log in to comment.
                    </p>

                    `
            }

        </div>

    `;


    // ======================================
    // DELETE POST
    // ======================================

    const deleteButton =
        article.querySelector(
            ".community-post-delete"
        );


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            function () {

                deleteCommunityPost(
                    post.id
                );

            }
        );

    }


    // ======================================
    // LIKE
    // ======================================

    const likeButton =
        article.querySelector(
            ".community-like-button"
        );


    if (likeButton) {

        likeButton.addEventListener(
            "click",
            function () {

                toggleCommunityLike(
                    post.id
                );

            }
        );

    }


    // ======================================
    // COMMENT TOGGLE
    // ======================================

    const commentButton =
        article.querySelector(
            ".community-comment-button"
        );


    const commentsContainer =
        article.querySelector(
            ".community-comments"
        );


    if (commentButton) {

        commentButton.addEventListener(
            "click",
            function () {

                if (
                    commentsContainer.style.display ===
                    "none"
                ) {

                    commentsContainer.style.display =
                        "block";

                } else {

                    commentsContainer.style.display =
                        "none";

                }

            }
        );

    }


    // ======================================
    // COMMENT SUBMIT
    // ======================================

    const commentSubmit =
        article.querySelector(
            ".community-comment-submit"
        );


    const commentInput =
        article.querySelector(
            ".community-comment-input"
        );


    if (
        commentSubmit &&
        commentInput
    ) {

        commentSubmit.addEventListener(
            "click",
            function () {

                createCommunityComment(
                    post.id,
                    commentInput,
                    commentsContainer
                );

            }
        );


        commentInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();


                    createCommunityComment(
                        post.id,
                        commentInput,
                        commentsContainer
                    );

                }

            }
        );

    }


    // ======================================
    // DELETE COMMENTS
    // ======================================

    article
        .querySelectorAll(
            ".community-comment-delete"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteCommunityComment(
                            button.dataset.commentId
                        );

                    }
                );

            }
        );


    return article;

}


// ==========================================
// CREATE COMMENTS HTML
// ==========================================

function createCommentsHTML(
    comments
) {

    if (
        !comments ||
        comments.length === 0
    ) {

        return `

            <p class="community-no-comments">
                No comments yet.
            </p>

        `;

    }


    return comments.map(
        function (comment) {

            const profile =
                comment.profiles || {};


            const username =
                profile.username ||
                "Athlete";


            const fullName =
                profile.full_name ||
                username;


            const profileImage =
                profile.profile_image ||
                "";


            // ==================================
            // COMMENT PROFILE LINK
            // ==================================

            const commentProfileLink =
                "profile.html?id=" +
                encodeURIComponent(
                    comment.user_id
                );


            let avatarHTML = "";


            if (profileImage) {

                avatarHTML = `

                    <a
                        href="${commentProfileLink}"
                        class="community-comment-profile-link"
                        aria-label="View ${escapeCommunityFeedText(username)}'s profile"
                    >

                        <img
                            src="${escapeCommunityFeedText(profileImage)}"
                            alt="${escapeCommunityFeedText(username)}"
                            class="community-comment-avatar"
                        >

                    </a>

                `;

            } else {

                avatarHTML = `

                    <a
                        href="${commentProfileLink}"
                        class="community-comment-profile-link"
                        aria-label="View ${escapeCommunityFeedText(username)}'s profile"
                    >

                        <div class="community-comment-avatar-placeholder">

                            ${escapeCommunityFeedText(
                                username
                                    .charAt(0)
                                    .toUpperCase()
                            )}

                        </div>

                    </a>

                `;

            }


            // ==================================
            // DELETE COMMENT
            // ==================================

            const deleteHTML =
                currentUser &&
                currentUser.id === comment.user_id
                    ? `

                        <button
                            type="button"
                            class="community-comment-delete"
                            data-comment-id="${comment.id}"
                        >
                            Delete
                        </button>

                    `
                    : "";


            return `

                <div class="community-comment">

                    ${avatarHTML}


                    <div class="community-comment-body">

                        <div class="community-comment-header">

                            <a
                                href="${commentProfileLink}"
                                class="community-comment-profile-name"
                            >

                                <strong>
                                    ${escapeCommunityFeedText(
                                        fullName
                                    )}
                                </strong>

                            </a>


                            <time>
                                ${formatCommunityDate(
                                    comment.created_at
                                )}
                            </time>

                        </div>


                        <p class="community-comment-content">

                            ${escapeCommunityFeedText(
                                comment.content
                            ).replace(
                                /\n/g,
                                "<br>"
                            )}

                        </p>


                        ${deleteHTML}

                    </div>

                </div>

            `;

        }
    ).join("");

}


// ==========================================
// CREATE COMMENT
// ==========================================

async function createCommunityComment(
    postId,
    input,
    commentsContainer
) {

    if (!currentUser) {

        alert(
            "You must be logged in to comment."
        );

        return;

    }


    const content =
        input.value.trim();


    if (!content) {

        return;

    }


    if (content.length > 500) {

        alert(
            "Your comment cannot exceed 500 characters."
        );

        return;

    }


    const submitButton =
        commentsContainer
            ? commentsContainer.querySelector(
                ".community-comment-submit"
            )
            : null;


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "POSTING...";

    }


    input.disabled =
        true;


    const {
        error
    } = await supabaseClient

        .from("community_comments")

        .insert({

            post_id:
                postId,

            user_id:
                currentUser.id,

            content:
                content

        });


    input.disabled =
        false;


    if (submitButton) {

        submitButton.disabled =
            false;

        submitButton.textContent =
            "COMMENT";

    }


    if (error) {

        console.error(
            "Create comment error:",
            error
        );


        alert(
            "ERROR: " +
            error.message
        );

        return;

    }


    input.value = "";


    await loadCommunityPosts();


    const refreshedComments =
        document.getElementById(
            "comments-" + postId
        );


    if (refreshedComments) {

        refreshedComments.style.display =
            "block";

    }

}


// ==========================================
// DELETE COMMENT
// ==========================================

async function deleteCommunityComment(
    commentId
) {

    if (!currentUser) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this comment?"
        );


    if (!confirmed) {

        return;

    }


    const {
        error
    } = await supabaseClient

        .from("community_comments")

        .delete()

        .eq(
            "id",
            commentId
        )

        .eq(
            "user_id",
            currentUser.id
        );


    if (error) {

        console.error(
            "Delete comment error:",
            error
        );


        alert(
            "We couldn't delete the comment."
        );

        return;

    }


    await loadCommunityPosts();

}


// ==========================================
// LIKE / UNLIKE
// ==========================================

async function toggleCommunityLike(
    postId
) {

    if (!currentUser) {

        alert(
            "You must be logged in to like a post."
        );

        return;

    }


    const {
        data: existingLike,
        error: checkError
    } = await supabaseClient

        .from("community_post_likes")

        .select("id")

        .eq(
            "post_id",
            postId
        )

        .eq(
            "user_id",
            currentUser.id
        )

        .maybeSingle();


    if (checkError) {

        console.error(
            "Like check error:",
            checkError
        );


        alert(
            "We couldn't update the like."
        );

        return;

    }


    if (existingLike) {

        const {
            error
        } = await supabaseClient

            .from("community_post_likes")

            .delete()

            .eq(
                "id",
                existingLike.id
            );


        if (error) {

            console.error(
                "Unlike error:",
                error
            );


            alert(
                "We couldn't remove your like."
            );

            return;

        }

    } else {

        const {
            error
        } = await supabaseClient

            .from("community_post_likes")

            .insert({

                post_id:
                    postId,

                user_id:
                    currentUser.id

            });


        if (error) {

            console.error(
                "Like error:",
                error
            );


            alert(
                "We couldn't like this post."
            );

            return;

        }

    }


    await loadCommunityPosts();

}


// ==========================================
// DELETE COMMUNITY POST
// ==========================================

async function deleteCommunityPost(
    postId
) {

    if (!currentUser) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this post?"
        );


    if (!confirmed) {

        return;

    }


    const {
        error
    } = await supabaseClient

        .from("community_posts")

        .delete()

        .eq(
            "id",
            postId
        )

        .eq(
            "user_id",
            currentUser.id
        );


    if (error) {

        console.error(
            "Delete post error:",
            error
        );


        alert(
            "We couldn't delete the post. Please try again."
        );

        return;

    }


    await loadCommunityPosts();

}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
    message,
    type
) {

    if (!postMessage) {

        return;

    }


    postMessage.textContent =
        message;


    postMessage.className =
        "community-post-message " +
        type;


    setTimeout(
        function () {

            postMessage.textContent =
                "";

            postMessage.className =
                "community-post-message";

        },
        4000
    );

}


// ==========================================
// FORMAT DATE
// ==========================================

function formatCommunityDate(
    dateString
) {

    if (!dateString) {

        return "";

    }


    const date =
        new Date(dateString);


    const now =
        new Date();


    const difference =
        Math.floor(
            (
                now.getTime() -
                date.getTime()
            ) / 1000
        );


    if (difference < 60) {

        return "Just now";

    }


    if (difference < 3600) {

        return (
            Math.floor(
                difference / 60
            ) +
            "m ago"
        );

    }


    if (difference < 86400) {

        return (
            Math.floor(
                difference / 3600
            ) +
            "h ago"
        );

    }


    if (difference < 604800) {

        return (
            Math.floor(
                difference / 86400
            ) +
            "d ago"
        );

    }


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeCommunityFeedText(
    value
) {

    if (!value) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// REFRESH FEED
// ==========================================

if (refreshFeedButton) {

    refreshFeedButton.addEventListener(
        "click",
        async function () {

            refreshFeedButton.disabled =
                true;


            refreshFeedButton.textContent =
                "↻ LOADING...";


            await loadCommunityPosts();


            refreshFeedButton.disabled =
                false;


            refreshFeedButton.textContent =
                "↻ REFRESH";

        }
    );

}


// ==========================================
// CREATE POST BUTTON
// ==========================================

if (createPostButton) {

    createPostButton.addEventListener(
        "click",
        createCommunityPost
    );

}


// ==========================================
// START
// ==========================================

async function initializeCommunityFeed() {

    await loadCurrentUser();

    await loadCommunityPosts();

}


initializeCommunityFeed();