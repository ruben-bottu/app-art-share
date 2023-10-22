(in-package :mu-cl-resources)

;; (setf *include-count-in-paginated-responses* t)
;; (setf *supply-cache-headers-p* t)
;; (setf sparql:*experimental-no-application-graph-for-sudo-select-queries* t)
;; (setf *cache-model-properties-p* t)

(define-resource artwork ()
  :class (s-prefix "schema:VisualArtwork")
  :properties `((:title :string ,(s-prefix "schema:headline"))
                (:artType :string ,(s-prefix "schema:artform"))
                (:description :string ,(s-prefix "schema:abstract"))
                (:imageUrl :string ,(s-prefix "schema:image")))
  :has-one `((artist :via ,(s-prefix "schema:artist")
              :as :artist))
  :resource-base (s-url "https://github.com/ruben-bottu/artwork-service/artworks/")
  :on-path "artworks")

(define-resource artist ()
  :class (s-prefix "schema:artist")
  :properties `((:name :string ,(s-prefix "schema:name"))
                (:given-name :string ,(s-prefix "foaf:givenName"))
                (:family-name :string ,(s-prefix "foaf:familyName")))
  :has-many `((artwork :via  (s-prefix "schema:artist")
               :inverse t
               :as "artworks"))
  :resource-base (s-url "https://github.com/ruben-bottu/artist-service/artists/")
  :on-path "artists")

;; Artist, type and image not working
;; create artwork not working

;; reading in the domain.json
;; (read-domain-file "domain.json")
