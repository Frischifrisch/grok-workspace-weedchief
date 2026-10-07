package app.chief.weedchief;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {
    private static final String PREFS = "chief-app";
    private static final String SITE_URL = "site-url";
    private static final int BG = Color.rgb(5, 9, 11);
    private static final int FG = Color.rgb(232, 240, 237);
    private static final int MUTED = Color.rgb(160, 176, 169);
    private static final int ACCENT = Color.rgb(52, 211, 153);

    private LinearLayout form;
    private EditText address;
    private WebView webView;
    private String siteHost;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(BG);

        LinearLayout header = new LinearLayout(this);
        header.setGravity(android.view.Gravity.CENTER_VERTICAL);
        header.setPadding(dp(20), dp(14), dp(16), dp(14));
        TextView brand = new TextView(this);
        brand.setText("CHIEF");
        brand.setTextColor(FG);
        brand.setTextSize(20);
        brand.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        header.addView(brand, new LinearLayout.LayoutParams(0, dp(48), 1));
        Button changeSite = button("Website ändern");
        changeSite.setOnClickListener(view -> showForm());
        header.addView(changeSite);
        root.addView(header);

        form = new LinearLayout(this);
        form.setOrientation(LinearLayout.VERTICAL);
        form.setPadding(dp(20), dp(8), dp(20), dp(20));
        TextView instructions = new TextView(this);
        instructions.setText("Gib die HTTPS-Adresse deiner veröffentlichten CHIEF-Web-App ein. Sie wird auf diesem Gerät gespeichert.");
        instructions.setTextColor(MUTED);
        instructions.setTextSize(15);
        form.addView(instructions, matchWrap());
        address = new EditText(this);
        address.setSingleLine(true);
        address.setHint("https://deine-app.example");
        address.setHintTextColor(MUTED);
        address.setTextColor(FG);
        address.setTextSize(16);
        address.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI);
        address.setPadding(dp(14), 0, dp(14), 0);
        address.setBackgroundTintList(android.content.res.ColorStateList.valueOf(ACCENT));
        LinearLayout.LayoutParams addressParams = matchWrap();
        addressParams.topMargin = dp(18);
        form.addView(address, addressParams);
        Button open = button("CHIEF öffnen");
        open.setOnClickListener(view -> openSite(address.getText().toString()));
        LinearLayout.LayoutParams openParams = matchWrap();
        openParams.topMargin = dp(12);
        form.addView(open, openParams);
        root.addView(form);

        webView = new WebView(this);
        webView.setBackgroundColor(BG);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (!"https".equalsIgnoreCase(uri.getScheme())) {
                    Toast.makeText(MainActivity.this, "Nur HTTPS-Links können geöffnet werden.", Toast.LENGTH_SHORT).show();
                    return true;
                }
                if (uri.getHost() != null && uri.getHost().equalsIgnoreCase(siteHost)) {
                    return false;
                }
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, uri));
                } catch (Exception ignored) {
                    Toast.makeText(MainActivity.this, "Dieser Link kann nicht geöffnet werden.", Toast.LENGTH_SHORT).show();
                }
                return true;
            }
        });
        root.addView(webView, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, 0, 1));
        webView.setVisibility(View.GONE);
        setContentView(root);

        String savedUrl = getPreferences(MODE_PRIVATE).getString(SITE_URL, "");
        if (!savedUrl.isEmpty()) {
            address.setText(savedUrl);
            openSite(savedUrl);
        }
    }

    private void openSite(String rawUrl) {
        Uri uri = Uri.parse(rawUrl.trim());
        if (!"https".equalsIgnoreCase(uri.getScheme()) || uri.getHost() == null
                || uri.getHost().isEmpty()) {
            address.setError("Bitte eine gültige HTTPS-Adresse eingeben.");
            return;
        }
        siteHost = uri.getHost();
        getPreferences(MODE_PRIVATE).edit().putString(SITE_URL, uri.toString()).apply();
        form.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
        webView.loadUrl(uri.toString());
    }

    private void showForm() {
        form.setVisibility(View.VISIBLE);
        address.requestFocus();
    }

    private Button button(String label) {
        Button button = new Button(this);
        button.setText(label);
        button.setTextColor(BG);
        button.setBackgroundTintList(android.content.res.ColorStateList.valueOf(ACCENT));
        return button;
    }

    private LinearLayout.LayoutParams matchWrap() {
        return new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    private int dp(int value) {
        return (int) (value * getResources().getDisplayMetrics().density + 0.5f);
    }

    @Override
    public void onBackPressed() {
        if (form.getVisibility() == View.VISIBLE && webView.getVisibility() == View.VISIBLE) {
            form.setVisibility(View.GONE);
            return;
        }
        if (webView.getVisibility() == View.VISIBLE && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}
